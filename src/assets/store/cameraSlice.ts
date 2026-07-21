import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCamera, updateCamera, deleteCamera } from '../service/ApiGet';
import type { components } from '../service/api';

type CameraData = components['schemas']['CameraDTO'];
type UpdateCameraData = components['schemas']['UpdateCameraDTO'];

interface ProfileState {
    cameraData: CameraData | null;
    isLoading: boolean;
}

const initialState: ProfileState = {
    cameraData: null,
    isLoading: false
};

export const fetchCameraThunk = createAsyncThunk<CameraData>(
    'profileSlice/fetchCamera',
    async () => {
        const response = await getCamera();
        return response.result;
    }
);

export const updateCameraThunk = createAsyncThunk<CameraData, UpdateCameraData>(
  'cameraSlice/updateCamera',
    async (cameraData) => {
        const response = await updateCamera(cameraData);
        return response.result;
    }
);

export const deleteCameraThunk = createAsyncThunk<void>(
    'cameraSlice/deleteCamera',
    async () => {
        await deleteCamera();
    }
);

const cameraSlice = createSlice({
    name: 'cameraSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getCamera
        .addCase(fetchCameraThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchCameraThunk.fulfilled, (state, action) => {
            state.cameraData = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchCameraThunk.rejected, (state) => {
            state.isLoading = false;
        })
        //updateCamera
        .addCase(updateCameraThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCameraThunk.fulfilled, (state, action) => {
            state.cameraData = action.payload;
            state.isLoading = false;
            alert('카메라 설정이 수정되었습니다.');
        })
        .addCase(updateCameraThunk.rejected, (state) => {
            state.isLoading = false;
            alert('카메라 설정 수정에 실패했습니다.');
        })
        //deleteCamera
        .addCase(deleteCameraThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCameraThunk.fulfilled, (state) => {
            state.cameraData = null;
            state.isLoading = false;
            alert('카메라 연결이 해제되었습니다.');
        })
        .addCase(deleteCameraThunk.rejected, (state) => {
            state.isLoading = false;
            alert('카메라 연결 해제에 실패했습니다.');
        });
    },
});

export default cameraSlice.reducer;