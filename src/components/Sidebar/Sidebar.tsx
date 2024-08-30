import { Box, Divider, Stack } from '@mui/material';
import MainMenu from './MainMenu/MainMenu';
import PlaylistsMenu from './Playlists/PlaylistsMenu';

export default function Sidebar() {
  return (
    <Stack
      direction="column"
      divider={<Divider variant="middle" flexItem />}
      spacing={2}
      display="flex"
      justifyContent="space-evenly"
      sx={{ height: '100%' }}
    >
      <MainMenu />
      <Box display="flex" gap={2} flexDirection="column" alignItems="center">
        <PlaylistsMenu />
      </Box>
    </Stack>
  );
}
