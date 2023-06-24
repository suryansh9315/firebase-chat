import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  roomType: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setRoomType: (state, action) => {
      state.roomType = action.payload;
    },
  },
});

export const { setRoomId, setRoomType } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;
export const selectRoomType = (state) => state.app.roomType;

export default appSlice.reducer;
