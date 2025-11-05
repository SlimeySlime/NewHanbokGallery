import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EventDateProvider } from './context/EventDateContext'
import Router from './Router'

// QueryClient는 컴포넌트 외부에서 생성하여 재생성 방지
const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<EventDateProvider>
				<Router />
			</EventDateProvider>
		</QueryClientProvider>
	)
}

export default App
