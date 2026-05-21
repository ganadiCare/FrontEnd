import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'kim',
  reducers:{}
})

export default configureStore({
  reducer: { 
    user: user.reducer
  }
}) 