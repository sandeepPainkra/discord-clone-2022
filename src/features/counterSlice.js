import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    user:null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    enterUser:(state,action)=>{
      state.user=action.payload;
    }
  },
});

export const { enterRoom } = counterSlice.actions;
export const { enterUser } = counterSlice.actions;
export const selectRoomId = (state) => state.app.roomId;
export const selectUser = (state) => state.app.user;

export default counterSlice.reducer;
