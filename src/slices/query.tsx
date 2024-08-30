import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_QUERY } from './const/constants';
import { Query } from './types/types';

const querySlice = createSlice({
  name: 'query',
  initialState: DEFAULT_QUERY,
  reducers: {
    resetQuery: () => DEFAULT_QUERY,
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    changeType: (state, action: PayloadAction<string>) => {
      state.type = action.payload as Query['type'];
    },
  },
});

const { actions, reducer: queryReducer } = querySlice;
export const { changeQuery, changeType } = actions;
export default queryReducer;
