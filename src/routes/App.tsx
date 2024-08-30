import { useSpotify } from '../hooks/useSpotify.ts';
import {
  Box,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.tsx';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer.tsx';
import UserInfo from '../components/UserInfo/UserInfo.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '../store.tsx';
import { initializeUser } from '../slices/user.tsx';
import { initializePlaylists } from '../slices/playlists.tsx';
import NavigateButtons from '../components/NavigateButtons/NavigateButtons.tsx';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  const sdk = useSpotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initializeApp() {
      const [user, playlists] = await Promise.all([
        sdk?.currentUser.profile(),
        sdk?.currentUser.playlists.playlists(),
      ]);
      if (!user || !playlists) return;

      dispatch(
        initializeUser({
          id: user.id,
          display_name: user.display_name,
          image: user.images[0].url,
          uri: user.uri,
        }),
      );
      dispatch(initializePlaylists(playlists));
    }
    initializeApp();
  }, [sdk, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          display: 'flex',
          backgroundColor: 'primary.main',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 2,
          padding: '16px',
        }}
      >
        <CssBaseline />
        <Grid container sx={{ flexGrow: 1 }} spacing={2}>
          <Grid item xs={2}>
            <Paper
              elevation={2}
              sx={{ height: '100%' }}
              style={{ padding: '16px' }}
            >
              <Sidebar />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper
              elevation={2}
              sx={{ height: '100%' }}
              style={{ padding: '16px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <NavigateButtons />
                <UserInfo />
              </Box>
              {sdk ? <Outlet /> : <></>}
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={2} style={{ padding: '16px' }}>
          <MusicPlayer />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
