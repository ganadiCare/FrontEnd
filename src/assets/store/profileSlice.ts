import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, loginMember, logoutMember, deleteMember } from '../service/ApiGet';
import type { components } from '../service/api';

type ProfileData = components['schemas']['ProfileDTO'];
type LoginData = components['schemas']['LoginDTO'];
type LoginResultData = components['schemas']['LoginResultDTO'];

interface ProfileState {
    loginData: LoginResultData | null;
    profileData: ProfileData | null;
    isLoading: boolean;
}

const initialState: ProfileState = {
    loginData: null,
    profileData: null,
    isLoading: false
};

export const fetchProfileThunk = createAsyncThunk<ProfileData>(
    'profileSlice/fetchProfile',
    async () => {
        const response = await getProfile();
        return response.result;
    }
);

export const loginThunk = createAsyncThunk<LoginResultData, LoginData>(
    'profileSlice/login',
    async (requestBody) => {
        const response = await loginMember(requestBody);
        return response.result;
    }
);

export const logoutThunk = createAsyncThunk<void>(
    'profileSlice/logout',
    async () => {
        await logoutMember();
        localStorage.removeItem('accessToken');
    }
);

export const deleteMemberThunk = createAsyncThunk<void>(
    'profileSlice/deleteMember',
    async () => {
        await deleteMember();
        localStorage.removeItem('accessToken');
    }
);

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getProfile
        .addCase(fetchProfileThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProfileThunk.fulfilled, (state, action) => {
            state.profileData = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchProfileThunk.rejected, (state) => {
            state.isLoading = false;
        })
        //loginMember
        .addCase(loginThunk.pending, (state) => { state.isLoading = true; })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.loginData = action.payload;
            state.isLoading = false;
        })
        .addCase(loginThunk.rejected, (state) => { state.isLoading = false; })
        //logoutMember
        .addCase(logoutThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutThunk.fulfilled, (state) => {
            state.loginData = null;
            state.profileData = null;
            state.isLoading = false;
            alert('로그아웃 되었습니다.');
        })
        .addCase(logoutThunk.rejected, (state) => {
            state.isLoading = false;
            state.loginData = null;
            state.profileData = null; 
            alert('서버 통신에 실패했으나 로그아웃 처리되었습니다.');
        })
        //deleteMember
        .addCase(deleteMemberThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteMemberThunk.fulfilled, (state) => {
            state.loginData = null;
            state.profileData = null;
            state.isLoading = false;
            alert('회원탈퇴가 완료되었습니다.');
        })
        .addCase(deleteMemberThunk.rejected, (state) => {
            state.isLoading = false;
            alert('오류로 인해 회원 탈퇴에 실패했습니다.');
        });
    },
});

export default profileSlice.reducer;