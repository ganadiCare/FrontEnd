import React, { useState } from 'react';
import './css/templete.css';
import './css/aireport.css';

import Header from './components/Header';
import Nav from './components/Nav';
import DatePicker from './components/DatePicker';
import BarGraph from './components/BarGraph';

const Report: React.FC = () => {
  const currentScreen = 'report';
  const [memo, setMemo] = useState('');
  
  // 날짜 상태 관리 (기본값 설정)
  const [selectedDate, setSelectedDate] = useState('2026-05-10');

  const today = new Date().toISOString().split('T')[0];

  // 시간대별 활동량 (단위: 분, 최대 60)
  const activityData = [60,0,0,0,0,0,10,15,30,50,35,40,20,45,60,55,30,20,15,25,10,0,0,0];
  const foodData     = [0,0,0,0,0,0,0,30,0,0,0,45,0,0,0,40,0,0,0,20,0,0,0,0];
  const waterData    = [0,0,0,0,0,0,15,0,20,0,10,0,25,0,10,0,20,15,0,10,0,0,0,0];

  // ✍️ 날짜 이동 핸들러 (하루 전, 하루 후 계산)
  const handleDateChange = (offset: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);

    // 다시 YYYY-MM-DD 포맷으로 변경
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const next = `${yyyy}-${mm}-${dd}`;

    if (next > today) return;
    setSelectedDate(next);
  };

  return (
    <>
      <Header title="REPORT" useNotification={true} />

      {/* 날짜 선택 바 */}
      <div className="report-date-bar">
        {/* 왼쪽 화살표: 하루 전 (-1) */}
        <button className="date-arrow-btn" onClick={() => handleDateChange(-1)}>
          {'<'}
        </button>
        
        {/* 선택된 날짜의 하이픈(-)을 점(.)으로 바꿔서 표시 */}
        <span className="date-text">{selectedDate.replace(/-/g, '.')}</span>
        
        {/* 오른쪽 화살표: 하루 후 (+1) */}
        <button className="date-arrow-btn" onClick={() => handleDateChange(1)}>
          {'>'}
        </button>
        
        <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} maxDate={today} />
      </div>

      <main className="main-content">
        
        {/* TODAY SUMMATION 섹션 */}
        <section className="main-section">
          <div className="report-box">
            <h2 className="report-box-title">TODAY SUMMATION</h2>
            <p className="report-sub-title">🐾 모카의 오늘의 건강 및 활동 요약 리포트</p>
            
            <div className="report-body-text">
              <p>오늘 하루 모카는 체계적인 영양 관리와 활발한 신체 활동을 통해 매우 건강하고 이상적인 하루를 보냈습니다. 기록된 데이터를 바탕으로 분석한 오늘의 주요 요약은 다음과 같습니다.</p>
              
              <p>1. 영양 및 수분 섭취 분석 모카는 오늘 총 3회의 규칙적인 식사를 통해 60g의 영양을 보충하며 안정적인 에너지원을 확보했습니다. 또한, 7번에 걸친 세심한 음수를 통해 총 150ml의 수분량을 기록했습니다.<br/>이는 체내 수분 밸런스를 안정적으로 유지하고 신진대사를 원활하게 돕는 아주 긍정적인 지표입니다.</p>
              
              <p>2. 활동 패턴 및 에너지 레벨 가장 활발한 움직임을 보인 시간대는 오후 2시경으로 나타났으며, 하루 중 에너지가 가장 집중되는 시간대를 아주 활동적으로 보냈습니다. 오늘 기록된 총 활동 시간 1시간 25분은 모카의 건강과 활력을 유지하고 스트레스를 해소하기에 충분한 수치입니다.</p>
              
              <p>종합 의견 전반적으로 모카는 식사와 활동의 균형이 완벽하게 잡힌 '활기찬 하루'를 보냈습니다. 충분한 영양 섭취와 적절한 운동량이 조화를 이루고 있어 건강 상태가 매우 양호한 것으로 판단됩니다. 내일도 모카가 오늘처럼 밝고 건강한 컨디션을 유지할 수 있도록 따뜻한 케어를 부탁드립니다!</p>
            </div>
          </div>
        </section>

        {/* GRAPH 섹션 */}
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

        {/* DESCRIPTION 섹션 */}
        <section className="main-section">
          <div className="report-box">
            <h2 className="report-box-title">DESCRIPTION</h2>

            <div className="desc-group">
              <p className="desc-category">ACTIVATION</p>
              <p className="desc-item">ACTIVATE TIME : 02 : 08</p>
            </div>

            <div className="desc-group">
              <p className="desc-category">FOOD</p>
              <p className="desc-item">FEEDING : 60g</p>
              <p className="desc-item">INTAKE : 50g</p>
              <p className="desc-item">LEFTOVERS : 10g</p>
            </div>

            <div className="desc-group">
              <p className="desc-category">WATER</p>
              <p className="desc-item">WATERING : 200ml</p>
              <p className="desc-item">INTAKE : 150ml</p>
              <p className="desc-item">LEFTOVERS : 50ml</p>
            </div>

            <button className="ai-report-btn">AI 분석 보러가기</button>
          </div>
        </section>

        {/* MEMO 섹션 */}
        <section className="main-section" style={{ marginBottom: '30px' }}>
          <div className="report-box">
            <h2 className="report-box-title">MEMO</h2>
            <textarea
              className="report-memo-input"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </section>

      </main>

      {/* 하단 네비게이션 */}
      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default Report;