import { Avatar, Box, IconButton, Typography } from '@mui/material';
import handleContentType from '../../utils/handleContentType';
import { Launch } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Album, Artist } from '../../slices/types/types';
import ArtistsInfo from './ArtistsInfo';

interface InfoHeaderProps {
  uri: string;
  name: string;
  image: string;
  type: 'playlist' | 'album' | 'track' | 'artist';
  description?: string;
  artists?: Array<Artist>;
  album?: Album;
}

export default function InfoHeader({
  uri,
  name,
  image,
  type,
  description,
  artists,
  album,
}: InfoHeaderProps) {
  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <Avatar
        variant="rounded"
        src={image}
        sx={{ width: '15rem', height: '15rem' }}
      >
        {name.slice(0, -1)}
      </Avatar>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography>{handleContentType(type)}</Typography>
          <Link to={uri}>
            <IconButton>
              <Launch />
            </IconButton>
          </Link>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }} variant="h2">
          {name}
        </Typography>
        {!!artists && <ArtistsInfo artists={artists} />}
        {!!album && (
          <Link
            to={`../album/${album.id}`}
            style={{ textDecoration: 'underline', color: 'inherit' }}
          >
            <Box display="flex" gap={2} alignItems="center">
              <Typography>{album.name}</Typography>
            </Box>
          </Link>
        )}
        {description && <Typography>{description}</Typography>}
      </Box>
    </Box>
  );
}
