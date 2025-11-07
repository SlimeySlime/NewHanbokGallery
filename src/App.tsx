import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './Router'
import { Provider } from 'react-redux'
import { store } from './store'

// QueryClient는 컴포넌트 외부에서 생성하여 재생성 방지
const queryClient = new QueryClient()

function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</Provider>
	)
}

export default App
