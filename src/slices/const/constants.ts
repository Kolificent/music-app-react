import { Playlist, Query, User } from '../types/types';

const DEFAULT_USER: User = {
  id: '',
  display_name: '',
  image: '',
  uri: '',
};

const DEFAULT_QUERY: Query = {
  query: '',
  type: 'artist',
};

const DEFAULT_PLAYER = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 50,
};

const DEFAULT_PLAYLISTS: Playlist[] = [];

export { DEFAULT_PLAYER, DEFAULT_QUERY, DEFAULT_USER, DEFAULT_PLAYLISTS };
