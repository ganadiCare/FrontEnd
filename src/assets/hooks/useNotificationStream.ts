// useNotificationStream.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createNotificationStream } from '../service/ApiGet';

interface Notification {
    id: string;
    message: string;
    date: string;
}

export const NOTIFICATION_QUERY_KEY = ['notifications'];

export const useNotificationStream = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        // ApiGet.tsx에서 만든 스트림 연결 함수 호출
        const eventSource = createNotificationStream();
        if (!eventSource) return;

        // 실시간 메시지 수신 이벤트 핸들러
        eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const now = new Date();
            const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            const newNotice: Notification = {
                id: Math.random().toString(36).substring(2, 9),
                message: data.message || event.data,
                date: dateString,
            };

            // React Query 캐시에 실시간 데이터를 맨 앞에 추가
            queryClient.setQueryData<Notification[]>(NOTIFICATION_QUERY_KEY, (oldData = []) => [
                newNotice,
                ...oldData,
            ]);
        } catch (error) {
            console.error('Notification 데이터 파싱 에러:', error);
        }
        };

        eventSource.onerror = (error) => {
            console.error('Notification 스트림 연결 에러:', error);
            eventSource.close();
        };

        // 언마운트 시 연결 종료
        return () => {
            eventSource.close();
        };
    }, [queryClient]);
};