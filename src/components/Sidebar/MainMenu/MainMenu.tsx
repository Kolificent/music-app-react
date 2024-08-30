import { Box, List } from '@mui/material';
import MainMenuItem from './MenuItem';
import { Home, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const navigate = useNavigate();

  const handleHomeNavigate = () => {
    navigate('..');
  };
  const handleSearchNavigate = () => {
    navigate('/search');
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <List>
        <MainMenuItem onClick={handleHomeNavigate} text="Главная">
          <Home />
        </MainMenuItem>
        <MainMenuItem onClick={handleSearchNavigate} text="Поиск">
          <Search />
        </MainMenuItem>
      </List>
    </Box>
  );
}
