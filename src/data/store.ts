import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: 'kim',
  reducers: {}
})

let camSlice = createSlice({
  name: 'camSlice',
  initialState: {
    dispenser: null,
    feeding : [],
    watering : [],
    isLoading : true
  },reducers : {
    setCamslice : (state, action)=>{
      state.dispenser = action.payload.dispenser;
      state.feeding = action.payload.feeding;
      state.watering = action.payload.watering;
      state.isLoading = false;
    }
  }
});

export let {setCamslice} = camSlice.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    camSlice: camSlice.reducer
  }
}) 