import React, { useState } from 'react';
import { useReport } from './store/useReport';
import './css/templete.css';
import './css/report.css';

import Header from './components/Header';
import Nav from './components/Nav';

import Calender from './components/Calendar'
import BarGraph from './components/BarGraph';

// 24시간 분량의 빈 배열 (그래프 기본값 — 데이터 없을 때 0으로 채움)
const EMPTY_24 = Array(24).fill(0);
// 급식/급수 로그 배열을 시간대별(0~23시) 합산 배열로 변환
// "HH:MM:SS" 또는 "YYYY-MM-DDTHH:MM:SS" 두 형식 모두 처리
const logsToHourly = (logs: {time: string | undefined; amount: number | undefined}[]): number[] => {
  const hourly = [...EMPTY_24];
  logs.forEach(({ time, amount }) => {
    if (!time || amount === undefined) return;
    
    const timePart = time.includes('T') ? time.split('T')[1] : time;
    const hour = parseInt(timePart.split(':')[0], 10);
    if (!isNaN(hour) && hour >= 0 && hour < 24) hourly[hour] += amount;
  });
  return hourly;
};
const day = new Date()
const today = day.toISOString().split('T')[0]; // 오늘 날짜
day.setDate(day.getDate() + 1);
const tomorrow = day.toISOString().split('T')[0]; // 내일 날짜


const ReportScreen: React.FC = () => {
  const currentScreen = 'report';
  
  // ─── 상태 정의 ────────────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState(today);       // 조회 중인 날짜
  const [selectedMemo, setMemo] = useState('');      // 메모 입력값
  const [prevReportId, setPrevReportId] = useState<number | undefined>(undefined);

  const {
    reportData,
    isReportLoading,
    isCreating,
    isUpdatingMemo,
    createReport,
    deleteReport,
    updateMemo
  } = useReport(selectedDate);

  const currentReportId = reportData?.reportId;
  if (currentReportId !== prevReportId) {
    setPrevReportId(currentReportId);
    setMemo(reportData?.memo ?? '');
  }

  const handleCreateReport = async() => {
    createReport(selectedDate);
  };

  const handleDeleteReport = async() => {
    deleteReport(reportData?.reportId ?? 0);
  };

  const refreshReport = async() => {
    await handleDeleteReport();
    await handleCreateReport();
  }

  const handleUpdateMemo = async() => {
    if (!reportData?.reportId) return;
    updateMemo({
      reportId: reportData.reportId,
      memoData: { memo: selectedMemo ?? '' },
    });
  }

  // ─── 날짜 이동 (<, > 버튼) ────────────────────────────────────────────────
  // offset: -1이면 하루 전, +1이면 하루 후 / 오늘 이후로는 이동 불가
  const handleDateChange = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const next = `${yyyy}-${mm}-${dd}`;
    if (next > tomorrow) return; // 미래 날짜 이동 차단
    setSelectedDate(next);
  };

  // ─── 그래프용 시간대별 데이터 변환 ───────────────────────────────────────
  // 리포트가 없으면 EMPTY_24(전부 0)를 사용하여 빈 그래프 표시
  
  const foodData = reportData?.feeding?.logs
    ? logsToHourly(reportData.feeding.logs.map(l => ({ time: l.feedTime, amount: l.amount })))
    : EMPTY_24;

  const waterData = reportData?.watering?.logs
    ? logsToHourly(reportData.watering.logs.map(l => ({ time: l.wateringTime, amount: l.amount })))
    : EMPTY_24;

  // 활동량: 별도 센서 API 연동 전까지 빈 데이터
  const activityData = EMPTY_24;

  return (
    <>
      <Header title="REPORT" useNotification={true} useBack={false} />

      {/* 날짜 선택 바: < 이전 날 / 날짜 표시 / 다음 날 > + 달력 아이콘 */}
      <div className="report-date-bar">
        <button className="date-arrow" onClick={() => handleDateChange(-1)}>{'<'}</button>
        <Calender selectedDate={selectedDate} onChange={setSelectedDate} maxDate={tomorrow} />
        {/*<span className="date-text">{selectedDate.replace(/-/g, '.')}</span>*/}
        <button className={(today>selectedDate) ? "date-arrow" : "date-arrow-disable"}
        onClick={() => handleDateChange(1)}>{'>'}</button>
        {/*<DatePicker selectedDate={selectedDate} onChange={setSelectedDate} maxDate={today} />*/}
      </div>

      <main className="main-content">
        {/* TODAY SUMMATION: 로딩 / AI 요약 / 리포트 없음(생성 버튼) 세 가지 상태 분기 */}
        <section className="main-section line">
          <div className='heading-wrapper'>
            <h2 className="section-heading">오늘의 활동 리포트</h2>
          </div>
          
          {isReportLoading ? (
            <p className="medium-text">리포트를 불러오는 중...</p>
          ) : reportData ? (
            <>
              {reportData.aiSummary?.split('\n').map((line, index) => (
                <span key={index} className='small-text'>
                  {line}
                  <br/>
                </span>
              ))}
              <button
                className="small-button"
                onClick={()=>refreshReport()}
                disabled={isCreating}
              >
                {isCreating ? '생성 중...' : '리포트 재생성'}
              </button>
            </>

            /*<p className="small-text" style={{ whiteSpace: 'pre-wrap' }}>
              {report.aiSummary}
            </p>*/
          ) : (
            <div>
              <p className="medium-text">해당 날짜의 리포트가 없습니다.</p>
              <button
                className="medium-button"
                onClick={()=>handleCreateReport()}
                disabled={isReportLoading}
              >
                {isReportLoading ? '생성 중...' : '리포트 생성'}
              </button>
            </div>
          )}
        </section>

        {/* GRAPH: 활동량·급식·급수를 시간대별 막대그래프로 표시 */}
        <section className="main-section line">
          <div className='heading-wrapper'>
            <h2 className="section-heading">그래프</h2>
          </div>
          <div className="graph-box">
            <span className="medium-text bold">활동</span>
            <BarGraph values={activityData} />
          </div>
          <div className="graph-box">
            <span className="medium-text bold">급식</span>
            <BarGraph values={foodData} />
          </div>
          <div className="graph-box">
            <span className="medium-text bold">급수</span>
            <BarGraph values={waterData} />
          </div>
        </section>

        {/* DESCRIPTION: 수치 요약 — 리포트 없으면 '-' 표시 */}
        <section className="main-section line">
          <div className='heading-wrapper'>
            <h2 className="section-heading">세부 데이터</h2>
          </div>

          <span className="medium-text bold">활동</span>
          <div className='section-box column'>
            <span className="medium-text">활동 시간 : 02 : 08</span>
          </div>

          <span className="medium-text bold">급식</span>
          <div className='section-box column'>
            <span className="medium-text">급여량 : {reportData?.feeding ? `${reportData.feeding.totalAmount}g` : '-'}</span>
            <span className="medium-text">섭취량 : {reportData?.feeding ? `${reportData.feeding.totalCount}g` : '-'}</span>
            <span className="medium-text">섭취 횟수 : {reportData?.feeding ? `${reportData.feeding.leftovers}회` : '-'}</span>
          </div>

          <span className="medium-text bold">급수</span>
          <div className='section-box column'>
            <span className="medium-text">급여량 : {reportData?.watering ? `${reportData.watering.totalAmount}ml` : '-'}</span>
            <span className="medium-text">섭취량 : {reportData?.watering ? `${reportData.watering.totalCount}ml` : '-'}</span>
            <span className="medium-text">섭취 횟수 : {reportData?.watering ? `${reportData.watering.leftovers}회` : '-'}</span>
          </div>
        </section>

        {/* MEMO: 리포트가 있을 때만 입력·저장 가능 */}
        <section className="main-section line">
          <div className='heading-wrapper'>
            <h2 className="section-heading">메모</h2>
          </div>
          <textarea
            aria-label='report-memo'
            className="report-memo-input"
            value={selectedMemo}
            onChange={(e) => setMemo(e.target.value)}
            disabled={!reportData} // 리포트 없으면 입력 비활성화
          />
          <button
            type='button'
            className="small-button"
            onClick={()=>handleUpdateMemo()}
            disabled={!reportData || isReportLoading}
          >
            {isUpdatingMemo ? '저장 중...' : '저장'}
          </button>
        </section>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default ReportScreen;
