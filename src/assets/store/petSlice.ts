import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPet, updatePet } from '../service/ApiGet';
import type { components } from '../service/api';

type PetData = components['schemas']['PetDTO'];
type UpdatePetData = components['schemas']['UpdatePetDTO'];

interface PetState {
    petData: PetData | null;
    isLoading: boolean;
}

const initialState: PetState = {
    petData: null,
    isLoading: false
};

export const fetchPetThunk = createAsyncThunk<PetData>(
    'petSlice/fetchPet',
    async () => {
        const response = await getPet();
        return response.result;
    }
);

export const updatePetThunk = createAsyncThunk<PetData, UpdatePetData>(
    'petSlice/updatePet',
    async (requestBody) => {
        const response = await updatePet(requestBody);
        return response.result;
    }
);

const petSlice = createSlice({
    name: 'petSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getPet
        .addCase(fetchPetThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchPetThunk.fulfilled, (state, action) => {
            state.petData = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchPetThunk.rejected, (state) => {
            state.isLoading = false;
        })
        //updatePet
        .addCase(updatePetThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updatePetThunk.fulfilled, (state, action) => {
            state.petData = action.payload; 
            state.isLoading = false;
            alert('반려동물 정보가 수정되었습니다.');
        })
        .addCase(updatePetThunk.rejected, (state) => {
            state.isLoading = false;
            alert('정보 수정에 실패했습니다.');
        });
    },
});

export default petSlice.reducer;