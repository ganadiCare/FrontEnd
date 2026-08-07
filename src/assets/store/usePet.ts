import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPet, updatePet } from '../service/ApiGet';
import type { components } from '../service/api';

type PetData = components['schemas']['PetDTO'];
type UpdatePetData = components['schemas']['UpdatePetDTO'];

export const PET_KEYS = {
  all: ['pet'] as const,
};

export const usePet = () => {
  const queryClient = useQueryClient();

  const petQuery = useQuery<PetData, Error>({
    queryKey: PET_KEYS.all,
    queryFn: async () => {
      const response = await getPet();
      return response.result ?? null;
    },
    staleTime: 1000 * 60 * 5,
  });

  const updatePetMutation = useMutation({
    mutationFn: async (requestBody: UpdatePetData) => {
      const response = await updatePet(requestBody);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PET_KEYS.all });
    },
    onError: () => {
      alert('정보 수정에 실패했습니다.');
    },
  });

  return {
    // 조회 데이터
    petData: petQuery.data ?? null,
    isPetLoading: petQuery.isLoading,
    isPetError: petQuery.isError,

    // 수정 함수
    updatePet: updatePetMutation.mutate,

    // Mutation 진행 상태
    isUpdatingPet: updatePetMutation.isPending,
  };
};