import axios from "axios";

const BASE_URL = 'http://20.189.241.58:8080'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function fetchInitialData() {
  console.log('스웨거로부터 초기 데이터를 가져오는 중...');
  
  api.get('/api/v1/dispensers/schedules')
    .then((결과) => {
      console.log('데이터 가져오기 성공', 결과.data);
      return 결과.data;
    })
    .catch((에러) => {
      console.log('실패함.');
      console.error(에러);
    })
    .finally(() => {
      // 4. 성공/실패 여부와 상관없이 무조건 마무리 실행되는 구역
      console.log('로딩 종료 .');
    });
}