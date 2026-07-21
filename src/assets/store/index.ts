import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';
import profileReducer from './profileSlice';
import cameraReducer from './cameraSlice';
import dispenserReducer from './dispenserSlice';
import reportReducer from './reportSlice';

const store = configureStore({
    reducer: {
        petSlice: petReducer,
        profileSlice: profileReducer,
        cameraSlice: cameraReducer,
        dispenserSlice: dispenserReducer,
        reportSlice: reportReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;