import { RootState } from '../store';

const selectQuery = (state: RootState) => state.queryReducer;

export { selectQuery };
