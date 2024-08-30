import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ReactNode } from 'react';

interface MenuItemProps {
  text: string;
  children?: ReactNode; // children могут быть иконкой или текстом
  onClick: () => void;
}

export default function MainMenuItem({
  text,
  children,
  onClick,
}: MenuItemProps) {
  return (
    <ListItem>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
