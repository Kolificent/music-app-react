import { List, Paper, Typography } from '@mui/material';
import PlaylistItem from './PlaylistItem';
import { useAppSelector } from '../../../store';
import { selectPlaylists } from '../../../selectors/playlistsSelector';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function PlaylistsMenu() {
  const navigate = useNavigate();
  const playlists = useAppSelector(selectPlaylists);

  return (
    <Fragment>
      <Typography>Плейлисты</Typography>
      <Paper
        elevation={2}
        sx={{
          width: '100%',
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: '60dvh',
        }}
      >
        <List>
          {playlists.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              onClick={() => {
                navigate(`playlist/${playlist.id}`);
              }}
              image={playlist.images[playlist.images.length - 1].url}
              text={playlist.name}
            />
          ))}
        </List>
      </Paper>
    </Fragment>
  );
}
