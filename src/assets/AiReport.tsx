import React, { useState } from 'react';
import './css/templete.css';
import './css/aireport.css';

import Header from './components/Header';
import Nav from './components/Nav';

const Report: React.FC = () => {
  const currentScreen = 'report';
  const [memo, setMemo] = useState('');
  
  // 날짜 상태 관리 (기본값 설정)
  const [selectedDate, setSelectedDate] = useState('2025-02-08');

  // ✍️ 날짜 이동 핸들러 (하루 전, 하루 후 계산)
  const handleDateChange = (offset: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    
    // 다시 YYYY-MM-DD 포맷으로 변경
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
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
        
        {/* 달력 클릭 기능 래퍼 */}
        <div className="calendar-icon-wrapper">
          <input 
            type="date" 
            className="hidden-date-picker"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <svg className="calendar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
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