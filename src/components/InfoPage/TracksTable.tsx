import { Track } from '../../slices/types/types';
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import convertDuration from '../../utils/convertDuration';
import { Link } from 'react-router-dom';
import ArtistsInfo from './ArtistsInfo';

interface TracksTableProps {
  tracks: Array<Track>;
  type: 'playlist' | 'album';
}

export default function TracksTable({ tracks, type }: TracksTableProps) {
  const isPlaylist = type === 'playlist';

  return (
    <TableContainer
      component={Paper}
      elevation={2}
      style={{ maxHeight: '60dvh' }}
    >
      <Table sx={{ padding: '16px' }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Название</TableCell>
            {isPlaylist && <TableCell>Альбом</TableCell>}
            <TableCell>Длительность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((track, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Typography>{index + 1}</Typography>
              </TableCell>
              <TableCell sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {isPlaylist && (
                  <Avatar
                    variant="rounded"
                    src={track.album.images[track.album.images.length - 1].url}
                  ></Avatar>
                )}
                <Box>
                  <Link
                    to={`../track/${track.id}`}
                    style={{ textDecoration: 'underline', color: 'inherit' }}
                  >
                    <Typography>{track.name}</Typography>
                  </Link>
                  {!!track.artists && <ArtistsInfo artists={track.artists} />}
                </Box>
              </TableCell>
              {isPlaylist && (
                <TableCell>
                  <Link
                    to={`../album/${track.album.id}`}
                    style={{ textDecoration: 'underline', color: 'inherit' }}
                  >
                    <Typography>{track.album.name}</Typography>
                  </Link>
                </TableCell>
              )}
              <TableCell>
                <Typography>{convertDuration(track.duration_ms)}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
