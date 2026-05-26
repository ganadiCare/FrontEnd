import axios from "axios";

// const BASE_URL = 'http://20.189.241.58:8080'; 
const BASE_URL = ''; 
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiZW1haWwiOiJweWdnb29kMTIzQG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoicHlnIiwidG9rZW5UeXBlIjoiYWNjZXNzIiwiaWF0IjoxNzc5ODI1Mzk2LCJleHAiOjE3Nzk4Mjg5OTZ9.OCQGIUGZ_peSLqz1X4Pg--Rzh4b2USbUtknp3ZuU_HyBgVXExsQj_WTNJ47m0K6hP1XD1Br20r-Ertx1t4kXTQ'

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