import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import playlistsReducer from './playlists';
import queryReducer from './query';
import playerReducer from './player';

const rootReducer = combineReducers({
  userReducer,
  playlistsReducer,
  queryReducer,
});

export default rootReducer;
