import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCamera, updateCamera, deleteCamera } from '../service/ApiGet';
import type { components } from '../service/api';

type CameraData = components['schemas']['CameraDTO'];
type UpdateCameraData = components['schemas']['UpdateCameraDTO'];

export const CAMERA_KEYS = {
    all: ['camera'] as const,
};

export const useCamera = () => {
    const queryClient = useQueryClient();

    const cameraQuery = useQuery<CameraData, Error>({
        queryKey: CAMERA_KEYS.all,
        queryFn: async () => {
            const response = await getCamera();
            return response.result ?? null;
        },
        staleTime: 1000 * 60 * 5, // 5분간 캐시 데이터 유지
    });

    const updateCameraMutation = useMutation({
        mutationFn: async (requestBody: UpdateCameraData) => {
            const response = await updateCamera(requestBody);
            return response.result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CAMERA_KEYS.all });
        },
        onError: () => {
            alert('카메라 설정 수정에 실패했습니다.');
        },
    });

    const deleteCameraMutation = useMutation({
        mutationFn: deleteCamera,
        onSuccess: () => {
            queryClient.setQueryData(CAMERA_KEYS.all, null);
        },
        onError: () => {
            alert('카메라 연결 해제에 실패했습니다.');
        },
    });

    return {
        // 조회 데이터
        cameraData: cameraQuery.data ?? null,
        isCameraLoading: cameraQuery.isLoading,
        isCameraError: cameraQuery.isError,

        // 기능 함수
        updateCamera: updateCameraMutation.mutate,
        deleteCamera: deleteCameraMutation.mutate,


        // Mutation 진행 상태
        isUpdatingCamera: updateCameraMutation.isPending,
        isDeletingCamera: deleteCameraMutation.isPending,
    };
};