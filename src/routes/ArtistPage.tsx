import { useEffect, useState } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { useParams } from 'react-router-dom';
import { Artist, Track } from '../slices/types/types';
import { Box, Typography } from '@mui/material';
import InfoHeader from '../components/InfoPage/InfoHeader';
import TracksTable from '../components/InfoPage/TracksTable';

export default function ArtistPage() {
  const artistId = useParams<{ id: string }>().id as string;
  const sdk = useSpotify();
  const [artist, setArtist] = useState<Artist>();
  const [tracks, setTracks] = useState<Array<Track>>();
  useEffect(() => {
    async function getPlaylistInfo() {
      try {
        const [info, tracksInfo] = await Promise.all([
          sdk?.artists.get(artistId),
          sdk?.artists.topTracks(artistId, 'ES'),
        ]);
        if (!info || !tracksInfo) return;

        const trackItems =
          tracksInfo.tracks.slice(0, 5).map((track) => ({
            id: track.id,
            name: track.name,
            artists: track.artists,
            uri: track.uri,
            album: track.album,
            type: track.type,
            images: track.album.images,
            duration_ms: track.duration_ms,
          })) || [];
        setArtist(info as Artist);
        setTracks(trackItems as Array<Track>);
      } catch (error) {
        console.error('Error fetching album info:', error);
      }
    }
    getPlaylistInfo();
  }, [sdk, artistId]);
  if (!artist || !tracks) return;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={2}
    >
      <InfoHeader
        uri={artist.uri}
        image={artist.images ? artist.images[0].url : ''}
        name={artist.name}
        type={artist.type}
      />
      <Box>
        <Typography variant="h6">Популярные треки:</Typography>
        <TracksTable tracks={tracks} type="playlist" />
      </Box>
    </Box>
  );
}
