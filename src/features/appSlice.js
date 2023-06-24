import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  roomType: null,
  isSidebar: false
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
    setIsSidebar: (state, action) => {
      state.isSidebar = action.payload;
    },
  },
});

export const { setRoomId, setRoomType, setIsSidebar } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;
export const selectRoomType = (state) => state.app.roomType;
export const selectIsSidebar = (state) => state.app.isSidebar;

export default appSlice.reducer;
