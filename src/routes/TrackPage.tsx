import { useEffect, useState } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { useParams } from 'react-router-dom';
import { Track } from '../slices/types/types';
import { Box, Typography } from '@mui/material';
import InfoHeader from '../components/InfoPage/InfoHeader';
import TracksTable from '../components/InfoPage/TracksTable';

export default function TrackPage() {
  const trackId = useParams<{ id: string }>().id as string;
  const sdk = useSpotify();
  const [track, setTrack] = useState<Track>();
  const [recommendations, setRecommendations] = useState<Array<Track>>();
  useEffect(() => {
    async function getPlaylistInfo() {
      try {
        const [info, recommendationsInfo] = await Promise.all([
          sdk?.tracks.get(trackId),
          sdk?.recommendations.get({ seed_tracks: [trackId] }),
        ]);
        if (!info || !recommendationsInfo) return;

        const recommendationsItems =
          recommendationsInfo.tracks.slice(0, 5).map((recommendation) => ({
            id: recommendation.id,
            name: recommendation.name,
            artists: recommendation.artists,
            uri: recommendation.uri,
            album: recommendation.album,
            type: recommendation.type,
            images: recommendation.album.images,
            duration_ms: recommendation.duration_ms,
          })) || [];
        setTrack(info as Track);
        setRecommendations(recommendationsItems as Array<Track>);
      } catch (error) {
        console.error('Error fetching album info:', error);
      }
    }
    getPlaylistInfo();
  }, [sdk, trackId]);
  if (!track || !recommendations) return;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={2}
    >
      <InfoHeader
        uri={track.uri}
        image={track.album.images ? track.album.images[0].url : ''}
        name={track.name}
        type={track.type}
        album={track.album}
      />
      <Box>
        <Typography variant="h6">Рекомендации:</Typography>
        <TracksTable tracks={recommendations} type="playlist" />
      </Box>
    </Box>
  );
}
