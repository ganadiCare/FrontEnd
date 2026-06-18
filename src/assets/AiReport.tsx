import React, { useState, useEffect, useCallback } from 'react';
import './css/templete.css';
import './css/aireport.css';

import Header from './components/Header';
import Nav from './components/Nav';
import DatePicker from './components/DatePicker';
import BarGraph from './components/BarGraph';
import { getReport, createReport, updateMemo } from '../api/report';
import type { ReportResult } from '../api/report';

// 24시간 분량의 빈 배열 (그래프 기본값 — 데이터 없을 때 0으로 채움)
const EMPTY_24 = Array(24).fill(0);

// 급식/급수 로그 배열을 시간대별(0~23시) 합산 배열로 변환
// "HH:MM:SS" 또는 "YYYY-MM-DDTHH:MM:SS" 두 형식 모두 처리
const logsToHourly = (logs: { time: string; amount: number }[]): number[] => {
  const hourly = [...EMPTY_24];
  logs.forEach(({ time, amount }) => {
    const timePart = time.includes('T') ? time.split('T')[1] : time;
    const hour = parseInt(timePart.split(':')[0], 10);
    if (!isNaN(hour) && hour >= 0 && hour < 24) hourly[hour] += amount;
  });
  return hourly;
};

const Report: React.FC = () => {
  const currentScreen = 'report';
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (미래 선택 방지 기준)

  // ─── 상태 정의 ────────────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState(today);       // 조회 중인 날짜
  const [report, setReport] = useState<ReportResult | null>(null); // 서버에서 받은 리포트 데이터
  const [memo, setMemo] = useState('');                          // 메모 입력값
  const [isLoading, setIsLoading] = useState(false);             // 리포트 조회 로딩
  const [isGenerating, setIsGenerating] = useState(false);       // AI 리포트 생성 로딩
  const [isSavingMemo, setIsSavingMemo] = useState(false);       // 메모 저장 로딩

  // ─── 리포트 조회 ──────────────────────────────────────────────────────────
  // useCallback으로 메모이제이션하여 useEffect 의존성 배열에서 무한 루프 방지
  const fetchReport = useCallback(async (date: string) => {
    setIsLoading(true);
    try {
      const res = await getReport(date);
      if (res.isSuccess) {
        setReport(res.result);
        setMemo(res.result.memo ?? ''); // 메모 없으면 빈 문자열
      } else {
        setReport(null);
      }
    } catch {
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ─── AI 리포트 생성 ───────────────────────────────────────────────────────
  // 해당 날짜 데이터가 없을 때 버튼을 눌러 새로 생성 요청
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const res = await createReport(selectedDate);
      if (res.isSuccess) {
        setReport(res.result);
        setMemo(res.result.memo ?? '');
      } else {
        alert(res.message || '리포트 생성에 실패했습니다.');
      }
    } catch {
      alert('서버 연결에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  // 날짜가 바뀔 때마다 해당 날짜의 리포트를 자동으로 다시 조회
  useEffect(() => {
    fetchReport(selectedDate);
  }, [selectedDate, fetchReport]);

  // ─── 날짜 이동 (<, > 버튼) ────────────────────────────────────────────────
  // offset: -1이면 하루 전, +1이면 하루 후 / 오늘 이후로는 이동 불가
  const handleDateChange = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const next = `${yyyy}-${mm}-${dd}`;
    if (next > today) return; // 미래 날짜 이동 차단
    setSelectedDate(next);
  };

  // ─── 메모 저장 ────────────────────────────────────────────────────────────
  // 리포트 ID를 기준으로 메모만 별도 업데이트
  const handleSaveMemo = async () => {
    if (!report) return;
    setIsSavingMemo(true);
    try {
      const res = await updateMemo(report.reportId, memo);
      if (!res.isSuccess) alert(res.message || '메모 저장에 실패했습니다.');
    } catch {
      alert('서버 연결에 실패했습니다.');
    } finally {
      setIsSavingMemo(false);
    }
  };

  // ─── 그래프용 시간대별 데이터 변환 ───────────────────────────────────────
  // 리포트가 없으면 EMPTY_24(전부 0)를 사용하여 빈 그래프 표시
  const foodData = report
    ? logsToHourly(report.feeding.logs.map(l => ({ time: l.feedTime, amount: l.amount })))
    : EMPTY_24;

  const waterData = report
    ? logsToHourly(report.watering.logs.map(l => ({ time: l.wateringTime, amount: l.amount })))
    : EMPTY_24;

  // 활동량: 별도 센서 API 연동 전까지 빈 데이터
  const activityData = EMPTY_24;

  return (
    <>
      <Header title="REPORT" useNotification={true} />

      {/* 날짜 선택 바: < 이전 날 / 날짜 표시 / 다음 날 > + 달력 아이콘 */}
      <div className="report-date-bar">
        <button className="date-arrow-btn" onClick={() => handleDateChange(-1)}>{'<'}</button>
        <span className="date-text">{selectedDate.replace(/-/g, '.')}</span>
        <button className="date-arrow-btn" onClick={() => handleDateChange(1)}>{'>'}</button>
        <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} maxDate={today} />
      </div>

      <main className="main-content">

        {/* TODAY SUMMATION: 로딩 / AI 요약 / 리포트 없음(생성 버튼) 세 가지 상태 분기 */}
        <section className="main-section">
          <div className="report-box">
            <h2 className="report-box-title">TODAY SUMMATION</h2>
            {isLoading ? (
              <p className="report-body-text">리포트를 불러오는 중...</p>
            ) : report ? (
              // pre-wrap: AI 요약의 줄바꿈(\n)을 그대로 렌더링
              <p className="report-body-text" style={{ whiteSpace: 'pre-wrap' }}>
                {report.aiSummary}
              </p>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <p className="report-body-text" style={{ marginBottom: '12px' }}>해당 날짜의 리포트가 없습니다.</p>
                <button
                  className="ai-report-btn"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                >
                  {isGenerating ? '생성 중...' : '리포트 생성'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* GRAPH: 활동량·급식·급수를 시간대별 막대그래프로 표시 */}
        <section className="main-section">
          <div className="report-box">
            <h2 className="report-box-title">GRAPH</h2>
            <div className="graph-row">
              <span className="graph-label">ACTIVITY</span>
              <BarGraph values={activityData} />
            </div>
            <div className="graph-row">
              <span className="graph-label">FOOD</span>
              <BarGraph values={foodData} />
            </div>
            <div className="graph-row">
              <span className="graph-label">WATER</span>
              <BarGraph values={waterData} />
            </div>
          </div>
        </section>

        {/* DESCRIPTION: 수치 요약 — 리포트 없으면 '-' 표시 */}
        <section className="main-section">
          <div className="report-box">
            <h2 className="report-box-title">DESCRIPTION</h2>

            <div className="desc-group">
              <p className="desc-category">ACTIVATION</p>
              <p className="desc-item">ACTIVATE TIME : 02 : 08</p>
            </div>

            <div className="desc-group">
              <p className="desc-category">FOOD</p>
              <p className="desc-item">FEEDING : {report ? `${report.feeding.totalAmount}g` : '-'}</p>
              <p className="desc-item">COUNT : {report ? `${report.feeding.totalCount}회` : '-'}</p>
              <p className="desc-item">LEFTOVERS : {report ? `${report.feeding.leftovers}g` : '-'}</p>
            </div>

            <div className="desc-group">
              <p className="desc-category">WATER</p>
              <p className="desc-item">WATERING : {report ? `${report.watering.totalAmount}ml` : '-'}</p>
              <p className="desc-item">COUNT : {report ? `${report.watering.totalCount}회` : '-'}</p>
              <p className="desc-item">LEFTOVERS : {report ? `${report.watering.leftovers}ml` : '-'}</p>
            </div>

            <button className="ai-report-btn">AI 분석 보러가기</button>
          </div>
        </section>

        {/* MEMO: 리포트가 있을 때만 입력·저장 가능 */}
        <section className="main-section" style={{ marginBottom: '30px' }}>
          <div className="report-box">
            <h2 className="report-box-title">MEMO</h2>
            <textarea
              className="report-memo-input"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              disabled={!report} // 리포트 없으면 입력 비활성화
            />
            <button
              className="ai-report-btn"
              onClick={handleSaveMemo}
              disabled={!report || isSavingMemo}
              style={{ marginTop: '10px' }}
            >
              {isSavingMemo ? '저장 중...' : '저장'}
            </button>
          </div>
        </section>

      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default Report;
