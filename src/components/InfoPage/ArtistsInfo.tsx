import { Artist } from '../../slices/types/types';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface ArtistsInfoProps {
  artists: Array<Artist>;
}

export default function ArtistsInfo({ artists }: ArtistsInfoProps) {
  return (
    <Box>
      {artists.map((artist, index) => {
        const isArtistLast = index < artists.length - 1;
        return (
          <span key={artist.id}>
            <Link
              to={`../artist/${artist.id}`}
              style={{ textDecoration: 'underline', color: 'inherit' }}
            >
              {artist.name}
            </Link>
            {!isArtistLast && ', '}
          </span>
        );
      })}
    </Box>
  );
}
