import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER } from './const/constants';

const userSlice = createSlice({
  name: 'user',
  initialState: DEFAULT_USER,
  reducers: {
    resetUser: () => DEFAULT_USER,
    initializeUser: (state, action) => {
      state.id = action.payload.id;
      state.display_name = action.payload.display_name;
      state.image = action.payload.image;
      state.uri = action.payload.uri;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
export const { resetUser, initializeUser } = actions;
export default userReducer;
