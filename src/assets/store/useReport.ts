import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReport, getReportList, getActivities, createReport, updateMemo, deleteReport } from '../service/ApiGet';
import type { components } from '../service/api';

type ReportData = components['schemas']['ReportDTO'];
type ReportListData = components['schemas']['ReportListDTO'];
type ActivityLogData = components['schemas']['ActivityLogDTO'];
type UpdateMemoData = components['schemas']['UpdateMemoDTO'];

export const REPORT_KEYS = {
  all: ['reports'] as const,
  lists: () => [...REPORT_KEYS.all, 'list'] as const,
  detail: (date?: string) => [...REPORT_KEYS.all, 'detail', date ?? 'latest'] as const,
};

export const ACTIVITY_KEYS = {
  all: ['activity'] as const,
  range: (from: string, to: string) => [...ACTIVITY_KEYS.all, { from, to }] as const,
};

// Date를 로컬 시간 그대로의 문자열로 변환 (UTC 변환 없이, 서버가 저장한 naive KST 값과 비교 기준을 맞추기 위함)
const toLocalDateTimeStr = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}.${ms}`;
};

export const useReport = (date?: string) => {
  const queryClient = useQueryClient();

  const baseDate = date ? new Date(date) : new Date();
  const from = toLocalDateTimeStr(new Date(baseDate.setHours(0, 0, 0, 0)));
  const to = toLocalDateTimeStr(new Date(baseDate.setHours(23, 59, 59, 999)));

  const reportQuery = useQuery<ReportData, Error>({
    queryKey: REPORT_KEYS.detail(date),
    queryFn: async () => {
      const response = await getReport(date);
      return response.result ?? null;
    },
  });

  const reportListQuery = useQuery<ReportListData[], Error>({
    queryKey: REPORT_KEYS.lists(),
    queryFn: async () => {
      const response = await getReportList();
      return response.result ?? [];
    },
  });

  const activityQuery = useQuery<ActivityLogData[], Error>({
    queryKey: ACTIVITY_KEYS.range(from, to),
    queryFn: async () => {
      const response = await getActivities(from, to);
      return response.result ?? [];
    },
    enabled: !!from && !!to,
  });

  const createReportMutation = useMutation({
    mutationFn: async (targetDate?: string) => {
      const response = await createReport(targetDate);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.all });
    },
    onError: () => {
      alert('리포트 생성에 실패했습니다.');
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: (reportId: number) => deleteReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.all });
    },
    onError: () => {
      alert('리포트 삭제에 실패했습니다.');
    },
  });

  const updateMemoMutation = useMutation({
    mutationFn: async ({ reportId, memoData }: { reportId: number; memoData: UpdateMemoData }) => {
      const response = await updateMemo(reportId, memoData);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.all });
    },
    onError: () => {
      alert('메모 수정에 실패했습니다.');
    },
  });

  return {
    // 조회 데이터
    reportData: reportQuery.data ?? null,
    reportList: reportListQuery.data ?? [],
    activityList: activityQuery.data ?? [],
    
    isReportLoading: reportQuery.isLoading && reportListQuery.isLoading && activityQuery.isLoading,
    isReportError: reportQuery.isError && reportListQuery.isError && activityQuery.isError,

    // 기능 함수
    createReport: createReportMutation.mutate,
    deleteReport: deleteReportMutation.mutate,
    updateMemo: updateMemoMutation.mutate,

    // Mutation 로딩 상태
    isCreating: createReportMutation.isPending,
    isDeleting: deleteReportMutation.isPending,
    isUpdatingMemo: updateMemoMutation.isPending,
  };
};