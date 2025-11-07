import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './Router'
import { Provider } from 'react-redux'
import { store } from './store'
import { useEffect } from 'react'
import { useAppDispatch } from './store/hooks'
import { setEventDate } from './store/slices/eventDateSlice'
import { getCookie } from './utils/cookieUtils'
import { formatDateToInput } from './utils/dateUtils'

// QueryClient는 컴포넌트 외부에서 생성하여 재생성 방지
const queryClient = new QueryClient()

function AppInitializer() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const savedDate = getCookie('eventDate')
		if (savedDate) {
			dispatch(setEventDate(savedDate))
		} else {
			const today = new Date()
			dispatch(setEventDate(formatDateToInput(today)))
		}
	}, [dispatch])

	return <Router />
}

function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AppInitializer />
			</QueryClientProvider>
		</Provider>
	)
}

export default App
