import { RootState } from '../store';

const selectUser = (state: RootState) => state.userReducer;

export { selectUser };
