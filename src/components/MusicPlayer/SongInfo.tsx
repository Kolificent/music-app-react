import { Avatar, Box, Typography } from '@mui/material';
import { MusicNote } from '@mui/icons-material';
import { Artist } from '../../slices/types/types';
import ArtistsInfo from '../InfoPage/ArtistsInfo';
import { Link } from 'react-router-dom';

interface SongInfoProps {
  id?: string;
  image?: string;
  title?: string;
  artists?: Array<Artist>;
}

export default function SongInfo({ id, image, title, artists }: SongInfoProps) {
  return (
    <Box display="flex" gap={2} alignItems="center">
      <Avatar
        sx={{ height: '4em', width: '4em' }}
        alt="title"
        variant="rounded"
        src={image}
      >
        <MusicNote />
      </Avatar>
      <Box>
        <Link
          to={`/track/${id}`}
          style={{ textDecoration: 'underline', color: 'inherit' }}
        >
          <Typography>{title}</Typography>
        </Link>
        {artists && <ArtistsInfo artists={artists} />}
      </Box>
    </Box>
  );
}
