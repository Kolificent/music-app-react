import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PLAYLISTS } from './const/constants';
import { Playlist } from './types/types';

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: DEFAULT_PLAYLISTS,
  reducers: {
    resetPlaylists: () => DEFAULT_PLAYLISTS,
    initializePlaylists: (state, action) => {
      const playlists = action.payload.items.map((item: Playlist) => {
        return {
          id: item.id,
          name: item.name,
          type: item.type,
          uri: item.uri,
          images: item.images,
          description: item.description,
        };
      });
      return playlists;
    },
  },
});

const { actions, reducer: playlistsReducer } = playlistsSlice;
export const { resetPlaylists, initializePlaylists } = actions;
export default playlistsReducer;
