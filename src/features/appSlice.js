import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { setRoomId } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
