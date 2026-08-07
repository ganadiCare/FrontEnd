import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReport, getReportList, createReport, updateMemo, deleteReport } from '../service/ApiGet';
import type { components } from '../service/api';

type ReportData = components['schemas']['ReportDTO'];
type ReportListData = components['schemas']['ReportListDTO'];
type UpdateMemoData = components['schemas']['UpdateMemoDTO'];

export const REPORT_KEYS = {
  all: ['reports'] as const,
  lists: () => [...REPORT_KEYS.all, 'list'] as const,
  detail: (date?: string) => [...REPORT_KEYS.all, 'detail', date ?? 'latest'] as const,
};

export const useReport = (date?: string) => {
  const queryClient = useQueryClient();

  const reportQuery = useQuery<ReportData, Error>({
    queryKey: REPORT_KEYS.detail(date),
    queryFn: async () => {
      const response = await getReport(date);
      return response.result ?? null;
    },
  });

  const reportListQuery = useQuery<ReportListData, Error>({
    queryKey: REPORT_KEYS.lists(),
    queryFn: async () => {
      const response = await getReportList();
      return response.result ?? [];
    },
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
    isReportLoading: reportQuery.isLoading && reportListQuery.isLoading,
    isReportError: reportQuery.isError && reportListQuery.isError,

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