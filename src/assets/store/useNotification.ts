import { useQuery, useQueryClient } from '@tanstack/react-query';

import { NOTIFICATION_QUERY_KEY } from '../hooks/useNotificationStream';

interface Notification {
    id: string;
    message: string;
    date: string;
}

export const useNotification = () => {
    const queryClient = useQueryClient();
    const { data: notifications = [] } = useQuery<Notification[]>({
        queryKey: NOTIFICATION_QUERY_KEY,
        queryFn: () => [],
        staleTime: Infinity,
    });

    const removeNotification = (id: string) => {
        queryClient.setQueryData<Notification[]>(NOTIFICATION_QUERY_KEY, (oldData = []) =>
            oldData.filter((notif) => notif.id !== id)
        );
    };

    const removeAllNotification = () => {
        queryClient.setQueryData<Notification[]>(NOTIFICATION_QUERY_KEY, []);
    }

    return {
        notifications,
        removeNotification,
        removeAllNotification,
  };
}