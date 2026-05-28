const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
});

interface FeedLog {
  feedTime: string;
  amount: number;
  leftovers: number;
}

interface WaterLog {
  wateringTime: string;
  amount: number;
  leftovers: number;
}

export interface ReportResult {
  reportId: number;
  reportDate: string;
  aiSummary: string;
  memo: string;
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

interface ReportResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReportResult;
}

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

export const updateMemo = async (reportId: number, memo: string): Promise<MemoResponse> => {
  const res = await fetch(`/api/v1/reports/${reportId}/memo`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ memo }),
  });
  return res.json();
};
