import { Avatar, Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store';
import { selectUser } from '../../selectors/userSelector';
import { Link } from 'react-router-dom';

export default function UserInfo() {
  const user = useAppSelector(selectUser);

  return (
    <Box
      component={Link}
      color="primary"
      to={user.uri}
      display="flex"
      alignItems="center"
      gap={1}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Avatar src={user.image}>{user.display_name[0]}</Avatar>
      <Box display="flex" flexDirection="column">
        <Typography variant="h6">{user.display_name}</Typography>
        <Typography variant="caption">{user.id}</Typography>
      </Box>
    </Box>
  );
}
