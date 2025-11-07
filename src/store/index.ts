import { configureStore } from '@reduxjs/toolkit';
import eventDateReducer from './slices/eventDateSlice';
import { galleryApi } from './api/galleryApi';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const middlewares = [galleryApi.middleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    eventDate: eventDateReducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

// 스토어의 상태 타입을 정의 (TypeScript를 위해)
export type RootState = ReturnType<typeof store.getState>;
// 디스패치 함수의 타입을 정의 (TypeScript를 위해)
export type AppDispatch = typeof store.dispatch;
