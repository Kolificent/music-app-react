import { useEffect, useState } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { useParams } from 'react-router-dom';
import { Album, Track } from '../slices/types/types';
import { Box } from '@mui/material';
import InfoHeader from '../components/InfoPage/InfoHeader';
import TracksTable from '../components/InfoPage/TracksTable';

export default function AlbumPage() {
  const albumId = useParams<{ id: string }>().id as string;
  const sdk = useSpotify();
  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<Array<Track>>();
  useEffect(() => {
    async function getAlbumInfo() {
      try {
        const info = await sdk?.albums.get(albumId);

        if (!info) return;

        const trackItems =
          info.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artists: track.artists,
            uri: track.uri,
            album: info,
            type: track.type,
            images: info.images,
            duration_ms: track.duration_ms,
          })) || [];
        setAlbum(info as Album);
        setTracks(trackItems as Array<Track>);
      } catch (error) {
        console.error('Error fetching album info:', error);
      }
    }
    getAlbumInfo();
  }, [sdk, albumId]);
  if (!album || !tracks) return;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={2}
    >
      <InfoHeader
        uri={album.uri}
        image={album.images[0].url}
        name={album.name}
        type={album.type}
        artists={album.artists}
      />
      <TracksTable tracks={tracks} type="album" />
    </Box>
  );
}
