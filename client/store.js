import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './reducers/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice
  },
});