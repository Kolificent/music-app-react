import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface PlaylistItemProps {
  image: string;
  text: string;
  onClick: () => void;
}

export default function PlaylistItem({
  image,
  text,
  onClick,
}: PlaylistItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          <Avatar variant="rounded" src={image}>
            {text[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
