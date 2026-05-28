import axios from "axios";

// const BASE_URL = 'http://20.189.241.58:8080'; 
const BASE_URL = ''; 
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJvbm1vaW05QGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoi6rCA64KY65SUIiwidG9rZW5UeXBlIjoiYWNjZXNzIiwiaWF0IjoxNzc5OTIwMzU4LCJleHAiOjE3Nzk5MjM5NTh9.xc77RfakZdcu56eanSiUMihciqJQloXlq2K7HBN3ZRKR7A5bKMHqUP90eyjKlmf5WHCovo59ZYzIdoqWmGC28w'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  }
});

export async function fetchInitialData() {
  console.log('스웨거로부터 초기 데이터를 가져오는 중...');

  const queryParams = {
      from: '2026-05-20T00:00:00', // 조회 시작일 (예시)
      to: '2026-05-27T23:59:59'   // 조회 종료일 (예시)
    };

  try {
    const [dispenser, feeding, watering] = await Promise.all([
      api.get('/api/v1/dispensers'),
      api.get('/api/v1/dispensers/logs/feeding',{params:queryParams}),
      api.get('/api/v1/dispensers/logs/watering',{params:queryParams}),
    ])
    // const 결과 = await api.get('/api/v1/dispensers');
   
    const combineData = {
      dispenser : dispenser.data,
      feeding : feeding.data,
      watering : watering.data
    }
  console.log('데이터 가져오기 성공', combineData);

    return combineData;
  } catch (에러) {
    console.log('실패함.');
    console.error(에러);
  } finally {
    console.log('로딩 종료.');
  }
}

//Body만 보내는 유형
export async function updateDispenserConfig(updateData: object) {
  try {
    const response = await api.patch('/api/v1/dispensers', updateData);
    console.log('설정 수정 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 설정 수정 실패:', error);
    throw error;
  }
}

//URL 파라미터 + Body 유형
export async function updateFeedSchedule(scheduleId: number, updatedSchedule: object) {
  try {
    // 💡 백틱(``)을 사용해서 주소창 중간에 고유 ID 값을 쏙 넣어줍니다.
    const response = await api.patch(`/api/v1/dispensers/schedules/${scheduleId}`, updatedSchedule);
    console.log(`📌 스케줄 ${scheduleId}번 수정 성공:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 스케줄 수정 실패:', error);
    throw error;
  }
}