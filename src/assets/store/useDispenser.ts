import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDispenser, updateDispenser, deleteDispenser, createDispenserSchedule, deleteDispenserSchedule } from '../service/ApiGet';
import type { components } from '../service/api';

type DispenserData = components['schemas']['DispenserDTO'];
type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];
type CreateScheduleData = components['schemas']['CreateScheduleDTO'];

export const DISPENSER_KEYS = {
    all: ['dispenser'] as const,
};

export const useDispenser = () => {
    const queryClient = useQueryClient();

    const dispenserQuery = useQuery<DispenserData, Error>({
        queryKey: DISPENSER_KEYS.all,
        queryFn: async () => {
            const response = await getDispenser();
            return response.result;
        },
        staleTime: 1000 * 60 * 5,
    });

    const updateMutation = useMutation({
        mutationFn: async (requestBody: UpdateDispenserData) => {
            const response = await updateDispenser(requestBody);
            return response.result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DISPENSER_KEYS.all });
        },
        onError: () => {
            alert('디스펜서 설정 수정에 실패했습니다.');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteDispenser,
        onSuccess: () => {
            queryClient.setQueryData(DISPENSER_KEYS.all, null);
        },
        onError: () => {
            alert('디스펜서 연결 해제에 실패했습니다.');
        },
    });

    const addScheduleMutation = useMutation({
        mutationFn: async (requestBody: CreateScheduleData) => {
            const response = await createDispenserSchedule(requestBody);
            return response.result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DISPENSER_KEYS.all });
        },
        onError: () => {
            alert('스케줄 등록에 실패했습니다');
        },
    });

    const removeScheduleMutation = useMutation({
        mutationFn: (scheduleId: number) => deleteDispenserSchedule(scheduleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DISPENSER_KEYS.all });
        },
        onError: () => {
            alert('스케줄 삭제에 실패했습니다.');
        },
    });

    return {
        // 상태 및 데이터
        dispenserData: dispenserQuery.data ?? null,
        isDispenserLoading: dispenserQuery.isLoading,
        isDispenserError: dispenserQuery.isError,

        // 기능 함수
        updateDispenser: updateMutation.mutate,
        deleteDispenser: deleteMutation.mutate,
        addSchedule: addScheduleMutation.mutate,
        removeSchedule: removeScheduleMutation.mutate,

        // 각각의 로딩 상태
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isAddingSchedule: addScheduleMutation.isPending,
        isRemovingSchedule: removeScheduleMutation.isPending,
    };
}