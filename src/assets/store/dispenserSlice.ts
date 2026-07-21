import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDispenser, updateDispenser, deleteDispenser, createDispenserSchedule, deleteDispenserSchedule } from '../service/ApiGet';
import type { components } from '../service/api';

type DispenserData = components['schemas']['DispenserDTO'];
type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];
type ScheduleData = components['schemas']['ScheduleDTO'];
type CreateScheduleData = components['schemas']['CreateScheduleDTO'];

interface DispenserState {
    dispenserData: DispenserData | null;
    isLoading: boolean;
}

const initialState: DispenserState = {
    dispenserData: null,
    isLoading: false
};

export const fetchDispenserThunk = createAsyncThunk<DispenserData>(
    'dispenserSlice/fetchDispenser',
    async () => {
        const response = await getDispenser();
        return response.result;
    }
);

export const updateDispenserThunk = createAsyncThunk<DispenserData, UpdateDispenserData>(
    'dispenserSlice/updateDispenser',
    async (requestBody) => {
        const response = await updateDispenser(requestBody);
        return response.result;
    }
);

export const deleteDispenserThunk = createAsyncThunk<void>(
    'dispenserSlice/deleteDispenser',
    async () => {
        await deleteDispenser();
    }
);

export const addScheduleThunk = createAsyncThunk<ScheduleData, CreateScheduleData>(
    'dispenserSlice/addSchedule',
    async (requestBody) => {
        const response = await createDispenserSchedule(requestBody);
        return response.result;
    }
);

export const removeScheduleThunk = createAsyncThunk<number, number>(
    'dispenserSlice/removeSchedule',
    async (scheduleId) => {
        await deleteDispenserSchedule(scheduleId);
        return scheduleId;
    }
);

const dispenserSlice = createSlice({
    name: 'dispenserSlice',
    initialState,
    reducers: {
        clearDispenserData: (state) => {
        state.dispenserData = null;
        }
    },
    extraReducers: (builder) => {
        builder
        //getDispenser
        .addCase(fetchDispenserThunk.pending, (state) => { state.isLoading = true; })
        .addCase(fetchDispenserThunk.fulfilled, (state, action) => {
            state.dispenserData = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchDispenserThunk.rejected, (state) => { state.isLoading = false; })
        //updateDispenser
        .addCase(updateDispenserThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateDispenserThunk.fulfilled, (state, action) => {
            state.dispenserData = action.payload;
            state.isLoading = false;
            alert('디스펜서 설정이 저장되었습니다.');
        })
        .addCase(updateDispenserThunk.rejected, (state) => {
            state.isLoading = false;
            alert('디스펜서 설정 수정에 실패했습니다.');
        })
        //deleteDispenser
        .addCase(deleteDispenserThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteDispenserThunk.fulfilled, (state) => {
            state.dispenserData = null;
            state.isLoading = false;
            alert('디스펜서 연결이 해제되었습니다.');
        })
        .addCase(deleteDispenserThunk.rejected, (state) => {
            state.isLoading = false;
            alert('디스펜서 연결 해제에 실패했습니다.');
        })
        //addDispenserSchedule
        .addCase(addScheduleThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addScheduleThunk.fulfilled, (state, action) => {
            if (state.dispenserData) {
                if (!state.dispenserData.feedingSchedules) {
                    state.dispenserData.feedingSchedules = [];
                }
                state.dispenserData.feedingSchedules.push(action.payload);
            }
            state.isLoading = false;
            alert('스케줄이 등록되었습니다.');
        })
        .addCase(addScheduleThunk.rejected, (state) => {
            state.isLoading = false;
            alert('스케줄 등록에 실패했습니다');
        })
        //removeDispenserSchedule
        .addCase(removeScheduleThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(removeScheduleThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            const deletedId = action.payload;
            if (state.dispenserData?.feedingSchedules) {
                state.dispenserData.feedingSchedules = state.dispenserData.feedingSchedules.filter(
                    (schedule) => schedule.scheduleId !== deletedId
                );
            }
            alert('스케줄이 삭제되었습니다.');
        })
        .addCase(removeScheduleThunk.rejected, (state) => {
            state.isLoading = false;
            alert('스케줄 삭제에 실패했습니다.');
        });
    },
});

export default dispenserSlice.reducer;