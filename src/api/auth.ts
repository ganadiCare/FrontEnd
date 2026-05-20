interface ApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  device: {
    cameraCode: string;
    dispenserCode: string;
  };
  pet: {
    name: string;
    species: string;
    gender: string;
    age: number;
    weight: number;
    birthday: string;
  };
}

interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    email: string;
    nickname: string;
  };
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  console.log('[signup] request body:', JSON.stringify(data, null, 2));
  const res = await fetch('/api/v1/members/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  console.log('[signup] response:', json);
  return json;
};

interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    accessToken: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await fetch('/api/v1/members/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const sendVerificationEmail = async (email: string): Promise<ApiResponse> => {
  const res = await fetch('/api/v1/members/mail/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export const verifyEmailCode = async (email: string, code: string): Promise<ApiResponse> => {
  const res = await fetch('/api/v1/members/mail/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  return res.json();
};
