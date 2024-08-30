import { useEffect, useState } from 'react';
import { useSpotify } from '../hooks/useSpotify.ts';
import { Box, Grid } from '@mui/material';
import SearchField from '../components/MainWindow/SearchPage/SearchField.tsx';
import { useAppSelector } from '../store.tsx';
import { selectQuery } from '../selectors/querySelector.ts';
import InfoCard from '../components/cards/InfoCard.tsx';
import { Album, Artist, Playlist, Track } from '../slices/types/types.ts';
import TracksTable from '../components/InfoPage/TracksTable.tsx';

export default function SearchPage() {
  const sdk = useSpotify();
  const query = useAppSelector(selectQuery);
  const [artists, setArtists] = useState<Array<Artist>>();
  const [albums, setAlbums] = useState<Array<Album>>();
  const [tracks, setTracks] = useState<Array<Track>>();
  const [playlists, setPlaylists] = useState<Array<Playlist>>();

  useEffect(() => {
    (async () => {
      if (!sdk) return;
      if (!query.query) return;

      const searchResults = await sdk.search(query.query, [query.type]);
      setArtists(searchResults.artists?.items as Array<Artist>);
      setAlbums(searchResults.albums?.items as Array<Album>);
      setTracks(searchResults.tracks?.items as Array<Track>);
      setPlaylists(searchResults.playlists?.items as Array<Playlist>);
    })();
  }, [query, sdk]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SearchField />
      <Box display="flex" flexDirection="row">
        {artists && (
          <Grid container spacing={1}>
            {artists.map((artist) => (
              <Grid item key={artist.id}>
                <InfoCard
                  id={artist.id}
                  name={artist.name}
                  image={
                    artist.images && artist.images.length > 0
                      ? artist.images[0].url
                      : ''
                  }
                  type="artist"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {tracks && <TracksTable tracks={tracks} type="playlist" />}
      {albums && (
        <Grid container spacing={1}>
          {albums.map((album) => (
            <Grid item key={album.id}>
              <InfoCard
                id={album.id}
                name={album.name}
                image={
                  album.images && album.images.length > 0
                    ? album.images[0].url
                    : ''
                }
                type="album"
              />
            </Grid>
          ))}
        </Grid>
      )}
      {playlists && (
        <Grid container spacing={1}>
          {playlists.map((playlist) => (
            <Grid item key={playlist.id}>
              <InfoCard
                id={playlist.id}
                name={playlist.name}
                image={
                  playlist.images && playlist.images.length > 0
                    ? playlist.images[0].url
                    : ''
                }
                type="playlist"
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
