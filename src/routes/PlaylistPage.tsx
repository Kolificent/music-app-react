import { useEffect, useState } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { useParams } from 'react-router-dom';
import { Playlist, Track } from '../slices/types/types';
import { Box } from '@mui/material';
import InfoHeader from '../components/InfoPage/InfoHeader';
import TracksTable from '../components/InfoPage/TracksTable';

export default function PlaylistPage() {
  const playlistId = useParams<{ id: string }>().id as string;
  const sdk = useSpotify();
  const [playlist, setPlaylist] = useState<Playlist>();
  const [tracks, setTracks] = useState<Array<Track>>();

  useEffect(() => {
    async function getPlaylistInfo() {
      try {
        const [info, tracksInfo] = await Promise.all([
          sdk?.playlists.getPlaylist(playlistId),
          sdk?.playlists.getPlaylistItems(playlistId),
        ]);

        if (!info || !tracksInfo) return;

        setPlaylist(info as Playlist);

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
      } catch (error) {
        console.error('Error fetching playlist info:', error);
      }
    }
    getPlaylistInfo();
  }, [sdk, playlistId]);
  if (!playlist || !tracks) return;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={2}
    >
      <InfoHeader
        uri={playlist.uri}
        image={playlist.images[0].url}
        name={playlist.name}
        type={playlist.type}
        description={playlist.description}
      />
      <TracksTable tracks={tracks} type="playlist" />
    </Box>
  );
}
