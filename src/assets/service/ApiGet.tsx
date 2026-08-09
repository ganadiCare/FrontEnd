import axios from "axios";
import type { components } from '../service/api';

const BASE_URL = ''; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && originalRequest && !originalRequest._retry) {
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

        if (originalRequest.headers) {
          originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
        }
        return api(originalRequest);
        
      } catch (error) {
        console.error('액세스 토큰 재발급 실패');
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        return Promise.reject(error);
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
type LoginData = components['schemas']['LoginDTO'];

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

export async function loginMember(requestBody: LoginData | undefined) {
  console.log('로그인 중...');
  try {
    const response = await api.post('/api/v1/members/login', requestBody);
    console.log('로그인 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('로그인 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function logoutMember() {
  console.log('로그아웃 중...');
  try {
    const response = await api.post('/api/v1/members/logout');
    console.log('로그아웃 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('로그아웃 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function deleteMember() {
  console.log('계정 삭제 중...');
  try {
    const response = await api.delete('/api/v1/members/me');
    console.log('계정 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('계정 삭제 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

//Pet API 관련
type UpdatePetData = components['schemas']['UpdatePetDTO'];

export async function getPet() {
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

export async function updatePet(requestBody: UpdatePetData | undefined) {
  console.log('Pet 데이터를 수정 중...');
  try {
    const response = await api.patch(`/api/v1/pets`, requestBody);
    console.log('Pet 데이터 수정 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('Pet 데이터 수정 실패', error);
    throw error;
  } finally {
    console.log('로딩 종료');
  }
}

//Camera API 관련
type UpdateCameraData = components['schemas']['UpdateCameraDTO'];

export async function getCamera() {
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

export async function updateCamera(requestBody: UpdateCameraData | undefined) {
  console.log('Camera 데이터를 수정 중...');
  try {
    const response = await api.patch('/api/v1/cameras', requestBody);
    console.log('Camera 데이터 수정 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Camera 데이터 수정 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function deleteCamera() {
  console.log('Camera 데이터를 삭제 중...');
  try {
    const response = await api.delete('/api/v1/cameras');
    console.log('Camera 데이터 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Camera 데이터 삭제 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

//Dispenser API 관련
type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];
type DispenserScheduleData = components['schemas']['CreateScheduleDTO'];

export async function getDispenser() {
  console.log('Dispenser 데이터를 가져오는 중...');
  try {
    const response = await api.get('/api/v1/dispensers');
    console.log('Dispenser 데이터 가져오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Dispenser 데이터 가져오기 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function updateDispenser(requestBody: UpdateDispenserData | undefined) {
  console.log('Dispenser 데이터를 수정 중...');
  try {
    const response = await api.patch('/api/v1/dispensers', requestBody);
    console.log('Dispenser 데이터 수정 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Dispenser 데이터 수정 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function deleteDispenser() {
  console.log('Dispenser 데이터를 삭제 중...');
  try {
    const response = await api.delete('/api/v1/dispensers');
    console.log('Dispenser 데이터 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Dispenser 데이터 삭제 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function createDispenserSchedule(requestBody: DispenserScheduleData | undefined) {
  console.log('Dispenser 스케줄 등록 중');
  try {
    const response = await api.post('/api/v1/dispensers/schedules', requestBody);
    console.log('Dispenser 스케줄 등록 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Dispenser 스케줄 등록 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function deleteDispenserSchedule(scheduleId: number) {
  console.log('Dispenser 스케줄 삭제 중');
  try {
    const response = await api.delete(`/api/v1/dispensers/schedules/${scheduleId}`);
    console.log('Dispenser 스케줄 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Dispenser 스케줄 삭제 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

//Report API 관련
export async function getReport(date?: string) {
  console.log('Report 데이터를 가져오는 중...');
  try {
    const response = await api.get('/api/v1/reports', {
      params: date ? { reportDate : date } : {}
    });
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

export async function getReportList() {
  console.log('Report 목록을 가져오는 중...');
  try {
    const response = await api.get('/api/v1/reports/list');
    console.log('Report 목록 가져오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Report 목록 가져오기 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function getActivities(from: string, to: string) {
  console.log('Activity 데이터를 가져오는 중...');
  try {
    const response = await api.get('/api/v1/activities', {
      params: { from, to, },
    });
    console.log('Activity 데이터 가져오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Activity 데이터 가져오기 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function createReport(date?: string) {
  console.log('Report 데이터 생성 중...');
  try {
    const response = await api.post('/api/v1/reports', {} , {
      params: date ? { reportDate : date } : {}
    });
    console.log('Report 데이터 생성 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Report 데이터 생성 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function deleteReport(reportId: number) {
  console.log('Report 데이터 삭제 중...');
  try {
    const response = await api.delete(`/api/v1/reports/${reportId}`);
    console.log('Report 데이터 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Report 데이터 삭제 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}

export async function updateMemo(
  reportId: number,
  memoData: {memo?: string | undefined}
) {
  console.log('Report 메모 수정 중...');
  try {
    const response = await api.patch(`/api/v1/reports/${reportId}/memo`, memoData);
    console.log('Report 메모 수정 성공', response.data);
    return response.data;
  } catch (error) {
    console.log('Report 메모 수정 실패');
    console.error(error);
    throw error; 
  } finally {
    console.log('로딩 종료');
  }
}