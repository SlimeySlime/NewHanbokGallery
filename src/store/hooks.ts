import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 타입이 적용된 useDispatch를 사용하기 위한 커스텀 훅
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// 타입이 적용된 useSelector를 사용하기 위한 커스텀 훅
export const useAppSelector = useSelector.withTypes<RootState>()
