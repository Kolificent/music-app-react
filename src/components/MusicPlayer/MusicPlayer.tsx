import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import SongInfo from './SongInfo';
import { useSpotify } from '../../hooks/useSpotify.ts';
import { useEffect, useRef, useState } from 'react';
import { Track } from '../../slices/types/types.ts';
import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';

const MusicPlayer = () => {
  const sdk = useSpotify();
  const [trackInfo, setTrackInfo] = useState<Track>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(new Audio('https://files.catbox.moe/tkyv0g.mp3'));

  const handleVolumeChange = (event, newValue) => {
    const audio = audioRef.current;
    audio.volume = newValue / 100;
    setVolume(newValue);
  };

  function handlePlayPause() {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  const handleTimeChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  useEffect(() => {
    async function getCurrentTrack() {
      if (!sdk) return;

      const info = await sdk.player.getPlaybackState();
      if (info) {
        setTrackInfo(info.item as Track);
      }
    }
    getCurrentTrack();

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
    };
  }, [sdk]);

  useEffect(() => {
    if (currentTime >= duration) {
      setIsPlaying(false);
    }
  }, [currentTime, duration]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {trackInfo ? (
        <SongInfo
          id={trackInfo.id}
          image={trackInfo.album.images[0].url}
          title={trackInfo.name}
          artists={trackInfo.artists}
        />
      ) : (
        <SongInfo />
      )}
      <Box
        minWidth="40%"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Stack direction="row">
          <IconButton>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton>
            <SkipNext />
          </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" width="100%">
          <Typography variant="body2">{`${Math.floor(currentTime / 60)}:${('0' + Math.floor(currentTime % 60)).slice(-2)}`}</Typography>
          <Slider
            value={currentTime}
            onChange={handleTimeChange}
            max={duration}
            sx={{ flexGrow: 0.5, mx: 2 }}
          />
          <Typography variant="body2">{`${Math.floor(duration / 60)}:${('0' + Math.floor(duration % 60)).slice(-2)}`}</Typography>
        </Stack>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          onClick={() => handleVolumeChange(null, volume === 0 ? 50 : 0)}
        >
          {volume === 0 ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={100}
          sx={{ width: '10em' }}
        />
      </Box>
    </Box>
  );
};

export default MusicPlayer;
