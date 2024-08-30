import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigateButtons() {
  const navigate = useNavigate();

  function handlePrevButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate(-1);
  }
  function handleNextButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate(1);
  }

  return (
    <Box>
      <IconButton onClick={handlePrevButton}>
        <NavigateBefore />
      </IconButton>
      <IconButton onClick={handleNextButton}>
        <NavigateNext />
      </IconButton>
    </Box>
  );
}
