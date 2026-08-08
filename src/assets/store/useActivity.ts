import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../service/ApiGet';
import type { components } from '../service/api';

type ActivityLogDTO = components['schemas']['ActivityLogDTO'];

export const ACTIVITY_KEYS = {
  all: ['activities'] as const,
  range: (date: string) => [...ACTIVITY_KEYS.all, date] as const,
};

const getNextDate = (date: string) => {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export const useActivity = (date: string) => {
  const from = `${date}T00:00:00`;
  const to = `${getNextDate(date)}T00:00:00`;

  const activityQuery = useQuery<ActivityLogDTO[], Error>({
    queryKey: ACTIVITY_KEYS.range(date),
    queryFn: async () => {
      const response = await getActivities(from, to);
      return response.result ?? [];
    },
  });

  return {
    activityLogs: activityQuery.data ?? [],
    isActivityLoading: activityQuery.isLoading,
    isActivityError: activityQuery.isError,
  };
};
