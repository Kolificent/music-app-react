import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface InfoCardProps {
  name: string;
  image: string;
  id: string;
  type: 'album' | 'playlist' | 'artist';
}

export default function InfoCard({ name, image, id, type }: InfoCardProps) {
  return (
    <Card component={Box} width="min-content">
      <CardActionArea>
        <Link
          to={`../${type}/${id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
            padding="16px"
          >
            <Avatar
              alt={name}
              src={image}
              sx={{ width: '6rem', height: '6rem' }}
            >
              {name.charAt(0)}
            </Avatar>
            <Typography align="center">{name}</Typography>
          </Box>
        </Link>
      </CardActionArea>
    </Card>
  );
}
