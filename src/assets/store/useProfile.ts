import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, loginMember, logoutMember, deleteMember, updateNickname, updatePassword } from '../service/ApiGet';
import type { components } from '../service/api';

type ProfileData = components['schemas']['ProfileDTO'];
type LoginData = components['schemas']['LoginDTO'];
type UpdateNicknameData = components['schemas']['UpdateNicknameDTO'];
type ChangePasswordData = components['schemas']['ChangePasswordDTO'];
type ApiResponseVoid = components['schemas']['ApiResponseVoid'];

export const PROFILE_KEYS = {
    all: ['profile'] as const,
};

export const useProfile = () => {
    const queryClient = useQueryClient();

    const profileQuery = useQuery<ProfileData, Error>({
    queryKey: PROFILE_KEYS.all,
    queryFn: async () => {
        const response = await getProfile();
        return response.result ?? null;
    },
    enabled: !!localStorage.getItem('accessToken'),
    });

    const loginMutation = useMutation({
    mutationFn: async (requestBody: LoginData) => {
        const response = await loginMember(requestBody);
        return response.result;
    },
    onSuccess: (data) => {
        if (data?.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
        }
        queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.all });
    },
    });

    const logoutMutation = useMutation({
    mutationFn: async () => {
        try {
            await logoutMember();
        } finally {
            localStorage.removeItem('accessToken');
            queryClient.clear();
        }
    },
    onSuccess: () => {
        alert('로그아웃 되었습니다.');
    },
    onError: () => {
        alert('서버 통신에 실패했으나 로그아웃 처리되었습니다.');
    },
    });

    const deleteMemberMutation = useMutation({
    mutationFn: async () => {
        await deleteMember();
        localStorage.removeItem('accessToken');
        queryClient.clear();
    },
    onSuccess: () => {
        alert('회원탈퇴가 완료되었습니다.');
    },
    onError: () => {
        alert('오류로 인해 회원 탈퇴에 실패했습니다.');
    },
    });

    const updateNicknameMutation = useMutation({
    mutationFn: async (requestBody: UpdateNicknameData) => {
        return await updateNickname(requestBody);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.all });
    },
    });

    const updatePasswordMutation = useMutation<ApiResponseVoid, Error, ChangePasswordData>({
    mutationFn: async (requestBody: ChangePasswordData) => {
        return await updatePassword(requestBody);
    },
    });

    const updatePasswordResult = async (requestBody: ChangePasswordData) => {
        try {
            const res = await updatePasswordMutation.mutateAsync(requestBody);
            return { 
                isSuccess: true, 
                message: res.message || '비밀번호가 성공적으로 변경되었습니다.' 
            };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : '비밀번호 변경 중 오류가 발생했습니다.';

            return { 
                isSuccess: false, 
                message: errorMessage
            }
      };
    };

    return {
    // 조회 데이터
    profileData: profileQuery.data ?? null,
    isProfileLoading: profileQuery.isLoading,
    isProfileError: profileQuery.isError,

    // 기능 함수 
    userLogin: loginMutation.mutate,
    userLogout: logoutMutation.mutate,
    userDelete: deleteMemberMutation.mutate,
    updateNickname: updateNicknameMutation.mutate,
    updatePassword: updatePasswordResult,

    // Mutation 진행 상태
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isDeletingMember: deleteMemberMutation.isPending,
    isUpdatingNickname: updateNicknameMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
    };
};