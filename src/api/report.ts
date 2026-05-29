// localStorage의 accessToken을 꺼내 모든 API 요청에 공통으로 붙이는 인증 헤더 생성
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
});

// ─── 타입 정의 ────────────────────────────────────────────────────────────────

interface FeedLog {
  feedTime: string;   // "HH:MM:SS" 형식
  amount: number;     // 급식량 (g)
  leftovers: number;  // 잔여량 (g)
}

interface WaterLog {
  wateringTime: string; // "HH:MM:SS" 형식
  amount: number;       // 급수량 (ml)
  leftovers: number;    // 잔여량 (ml)
}

// 리포트 전체 데이터 구조 — getReport / createReport 응답의 result 필드
export interface ReportResult {
  reportId: number;
  reportDate: string;  // "YYYY-MM-DD"
  aiSummary: string;   // AI가 생성한 하루 요약 텍스트
  memo: string;        // 사용자가 작성한 메모
  feeding: {
    totalAmount: number;
    totalCount: number;
    leftovers: number;
    logs: FeedLog[];
  };
  watering: {
    totalAmount: number;
    totalCount: number;
    leftovers: number;
    logs: WaterLog[];
  };
}

// GET / POST /api/v1/reports 공통 응답 타입
interface ReportResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReportResult;
}

// PATCH /api/v1/reports/{reportId}/memo 응답 타입 (메모 필드만 포함)
interface MemoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    reportId: number;
    reportDate: string;
    aiSummary: string;
    memo: string;
  };
}

// ─── API 함수 ─────────────────────────────────────────────────────────────────

// GET /api/v1/reports?reportDate={date} — 날짜별 리포트 조회
// reportDate 생략 시 서버가 오늘 날짜로 처리
export const getReport = async (reportDate?: string): Promise<ReportResponse> => {
  const url = reportDate
    ? `/api/v1/reports?reportDate=${reportDate}`
    : '/api/v1/reports';
  const res = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return res.json();
};

// POST /api/v1/reports?reportDate={date} — AI 리포트 생성 요청
// 해당 날짜의 급식·급수 데이터를 기반으로 서버가 AI 요약을 생성해 반환
export const createReport = async (reportDate?: string): Promise<ReportResponse> => {
  const url = reportDate
    ? `/api/v1/reports?reportDate=${reportDate}`
    : '/api/v1/reports';
  const res = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  return res.json();
};

// PATCH /api/v1/reports/{reportId}/memo — 메모만 단독 수정
export const updateMemo = async (reportId: number, memo: string): Promise<MemoResponse> => {
  const res = await fetch(`/api/v1/reports/${reportId}/memo`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ memo }),
  });
  return res.json();
};

// DELETE /api/v1/reports/{reportId} — 리포트 삭제
export const deleteReport = async (reportId: number): Promise<{ isSuccess: boolean; code: string; message: string; result: object }> => {
  const res = await fetch(`/api/v1/reports/${reportId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
};
