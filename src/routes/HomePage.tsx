import { useEffect, useState } from 'react';
import { useSpotify } from '../hooks/useSpotify.ts';
import { Artist, Track } from '../slices/types/types.ts';
import { Box, Stack, Typography } from '@mui/material';
import InfoCard from '../components/cards/InfoCard.tsx';
import TracksTable from '../components/InfoPage/TracksTable.tsx';

export default function HomePage() {
  const sdk = useSpotify();
  const [artists, setArtists] = useState<Array<Artist>>();
  const [tracks, setTracks] = useState<Array<Track>>();

  useEffect(() => {
    (async () => {
      if (!sdk) return;
      const [results, tracksInfo] = await Promise.all([
        sdk.currentUser.topItems('artists'),
        sdk.player.getRecentlyPlayedTracks(5),
      ]);
      setArtists(results.items as Array<Artist>);

      const trackItems =
        tracksInfo.items?.map((track) => ({
          id: track.track.id,
          name: track.track.name,
          artists: track.track.artists,
          uri: track.track.uri,
          album: track.track.album,
          type: track.track.type,
          images: track.track.album.images,
          duration_ms: track.track.duration_ms,
        })) || [];

      setTracks(trackItems as Array<Track>);
    })();
  }, [sdk]);
  if (!artists || !tracks) return;

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography>Топ исполнители:</Typography>
      <Stack
        direction="row"
        spacing={1}
        style={{ display: 'flex', overflowX: 'auto' }}
      >
        {artists.map((artist) => (
          <Box key={artist.id}>
            <InfoCard
              id={artist.id}
              name={artist.name}
              image={artist.images ? artist.images[0].url : ''}
              type="artist"
            />
          </Box>
        ))}
      </Stack>
      <Box display="flex" flexDirection="column">
        <Typography>История прослушиваний:</Typography>
        <TracksTable tracks={tracks} type="playlist" />
      </Box>
    </Box>
  );
}
