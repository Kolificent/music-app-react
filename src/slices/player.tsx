import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PLAYER } from './const/constants';

const playerSlice = createSlice({
  name: 'audio',
  initialState: DEFAULT_PLAYER,
  reducers: {
    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    updateCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
  },
});

const { actions, reducer: playerReducer } = playerSlice;
export const {
  togglePlayPause,
  setCurrentTime,
  setVolume,
  setDuration,
  updateCurrentTime,
} = actions;
export default playerReducer;
