import { Box, Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch, useAppSelector } from '../../../store';
import { changeQuery, changeType } from '../../../slices/query';
import { selectQuery } from '../../../selectors/querySelector';

function SearchField() {
  const initialQuery = useAppSelector(selectQuery);
  const [tempQuery, setTempQuery] = useState(initialQuery.query);
  const dispatch = useAppDispatch();

  const debounceTime = 400;
  const debouncedSetQuery = useDebouncedCallback((value) => {
    dispatch(changeQuery(value));
  }, debounceTime);

  useEffect(() => {
    setTempQuery(initialQuery.query);
  }, [initialQuery]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setTempQuery(input);
    debouncedSetQuery(input);
  }

  function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
    dispatch(changeType(e.currentTarget.id));
  }

  return (
    <Box display="flex" gap={2}>
      <TextField
        value={tempQuery}
        onChange={handleChange}
        sx={{ width: '40%' }}
        label="Поиск"
        variant="outlined"
        size="small"
      />
      <Stack direction="row" gap={1}>
        <Button
          id="artist"
          onClick={handleButtonClick}
          variant={initialQuery.type === 'artist' ? 'contained' : 'outlined'}
        >
          Исполнители
        </Button>
        <Button
          id="track"
          onClick={handleButtonClick}
          variant={initialQuery.type === 'track' ? 'contained' : 'outlined'}
        >
          Треки
        </Button>
        <Button
          id="playlist"
          onClick={handleButtonClick}
          variant={initialQuery.type === 'playlist' ? 'contained' : 'outlined'}
        >
          Плейлисты
        </Button>
        <Button
          id="album"
          onClick={handleButtonClick}
          variant={initialQuery.type === 'album' ? 'contained' : 'outlined'}
        >
          Альбомы
        </Button>
      </Stack>
    </Box>
  );
}

export default SearchField;
