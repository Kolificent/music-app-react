interface User {
  id: string;
  display_name: string;
  image: string;
  uri: string;
}

interface Playlist {
  id: string;
  name: string;
  type: 'playlist';
  uri: string;
  images: Array<Image>;
  description: string;
}

interface Artist {
  id: string;
  name: string;
  uri: string;
  type: 'artist';
  images?: Array<Image>;
}

interface Query {
  query: string;
  type: 'album' | 'playlist' | 'artist' | 'track';
}

interface Album {
  id: string;
  artists: Array<Artist>;
  name: string;
  type: 'album';
  uri: string;
  images: Array<Image>;
}

interface Track {
  id: string;
  name: string;
  artists: Array<Artist>;
  uri: string;
  album: Album;
  type: 'track';
  duration_ms: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export type { Query, User, Track, Artist, Album, Playlist, Image };
