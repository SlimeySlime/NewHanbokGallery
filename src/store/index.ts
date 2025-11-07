import { configureStore } from '@reduxjs/toolkit'
import eventDateReducer from './slices/eventDateSlice'
import { galleryApi } from './api/galleryApi'

export const store = configureStore({
	reducer: {
		// 여기에 각 기능별 슬라이스의 리듀서를 추가합니다.
		eventDate: eventDateReducer,
		// 생성된 API 슬라이스의 리듀서를 추가합니다.
		[galleryApi.reducerPath]: galleryApi.reducer,
	},
	// 미들웨어를 추가하면 RTK Query의 캐싱, 무효화, 폴링 등의 기능을 사용할 수 있습니다.
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(galleryApi.middleware),
})

// 스토어의 상태 타입을 정의 (TypeScript를 위해)
export type RootState = ReturnType<typeof store.getState>
// 디스패치 함수의 타입을 정의 (TypeScript를 위해)
export type AppDispatch = typeof store.dispatch
