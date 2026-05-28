import axios from "axios";

// const BASE_URL = 'http://20.189.241.58:8080'; 
const BASE_URL = ''; 
//const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJvbm1vaW05QGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoi6rCA64KY65SUIiwidG9rZW5UeXBlIjoiYWNjZXNzIiwiaWF0IjoxNzc5OTIwMzU4LCJleHAiOjE3Nzk5MjM5NTh9.xc77RfakZdcu56eanSiUMihciqJQloXlq2K7HBN3ZRKR7A5bKMHqUP90eyjKlmf5WHCovo59ZYzIdoqWmGC28w'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${TOKEN}`
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
    console.error('설정 수정 실패:', error);
    throw error;
  }
}

//URL 파라미터 + Body 유형
export async function updateFeedSchedule(scheduleId: number, updatedSchedule: object) {
  try {
    const response = await api.patch(`/api/v1/dispensers/schedules/${scheduleId}`, updatedSchedule);
    console.log(`스케줄 ${scheduleId}번 수정 성공:`, response.data);
    return response.data;
  } catch (error) {
    console.error('스케줄 수정 실패:', error);
    throw error;
  }
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthError = error.response && (error.response.status === 401 || error.response.status === 403);
    if (isAuthError && !originalRequest._retry) {
      originalRequest._retry = true; // 플래그를 true로 설정
      try {
        console.log('액세스 토큰 재발급 시도');
        const response = await axios.post(`/api/v1/members/refresh`, {}, {
            withCredentials: true
        });

        const newAccessToken = response.data?.accessToken || response.data?.result?.accessToken;
        if (!newAccessToken) {
          throw new Error('응답에서 액세스 토큰을 찾을 수 없습니다.');
        }
        localStorage.setItem('accessToken', newAccessToken);
        console.log('액세스 토큰 재발급 성공.');

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); 
        
      } catch (refreshError) {
        console.error('액세스 토큰 재발급 실패');
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

//쿠키를 이용하여 액세스 토큰 발급
export async function initAccessToken() {
  try {
    console.log('최초 액세스 토큰 발급 시도');
    const response = await axios.post('/api/v1/members/refresh', {}, {
      withCredentials: true // 쿠키를 들고 가서 새 토큰을 받아옴
    });
    
    const newAccessToken = response.data?.accessToken || response.data?.result?.accessToken;
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
      console.log('액세스 토큰 발급 성공');
      return true;
    }
    return false;
  } catch (error) {
    console.error('쿠키가 없거나 만료되었습니다.', error);
    return false;
  }
}

//Member API 관련
export async function getProfile() {
    console.log('Profile 데이터를 가져오는 중...');
    try {
        const response = await api.get('/api/v1/members/profile');
        console.log('Profile 데이터 가져오기 성공', response.data);
        return response.data;
    } catch (error) {
        console.log('Profile 데이터 가져오기 실패');
        console.error(error);
        throw error; 
    } finally {
        console.log('로딩 종료');
    }
}

//Pet API 관련
export async function getPets() {
    console.log('Pet 데이터를 가져오는 중...');
    try {
        const response = await api.get('/api/v1/pets');
        console.log('Pet 데이터 가져오기 성공', response.data);
        return response.data;
    } catch (error) {
        console.log('Pet 데이터 가져오기 실패');
        console.error(error);
        throw error; 
    } finally {
        console.log('로딩 종료');
    }
}

export async function updatePets(petData={}) {
    console.log('Pet 데이터를 수정 중...');
    try {
        const response = await api.patch(`/api/v1/pets`, petData);
        console.log('Pet 수정 성공', response.data);
        return response.data;
    } catch (error) {
        console.error('Pet 수정 실패', error);
        throw error;
    }
}


//Report API 관련
export async function getReports() {
    console.log('Report 데이터를 가져오는 중...');
    try {
        const response = await api.get('/api/v1/reports');
        console.log('Report 데이터 가져오기 성공', response.data);
        return response.data;
    } catch (error) {
        console.log('Report 데이터 가져오기 실패');
        console.error(error);
        throw error; 
    } finally {
        console.log('로딩 종료');
    }
}

//Camera API 관련
export async function getCameras() {
    console.log('Camera 데이터를 가져오는 중...');
    try {
        const response = await api.get('/api/v1/cameras');
        console.log('Camera 데이터 가져오기 성공', response.data);
        return response.data;
    } catch (error) {
        console.log('Camera 데이터 가져오기 실패');
        console.error(error);
        throw error; 
    } finally {
        console.log('로딩 종료');
    }
  
}