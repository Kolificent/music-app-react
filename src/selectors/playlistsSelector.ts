import { RootState } from '../store';

const selectPlaylists = (state: RootState) => state.playlistsReducer;

export { selectPlaylists };
