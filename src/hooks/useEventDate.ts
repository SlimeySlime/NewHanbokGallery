import { useQueryState } from './useQueryState'
import { parseDateString, addDays, formatDateToSQL } from '../utils/dateUtils'

// 이 상태를 식별하는 고유한 키
const eventDateQueryKey = ['global', 'eventDate']

// 상태의 타입 정의
interface EventDateState {
	eventDate: string // YYYY-MM-DD 형식, input 표시용
	rentalStart: string | null
	rentalEnd: string | null
}

// 상태의 초기값
const initialState: EventDateState = {
	eventDate: '',
	rentalStart: null,
	rentalEnd: null,
}

/**
 * 행사 날짜 및 대여 기간을 관리하는 전역 상태 훅
 */
export function useEventDate() {
	const [state, setState] = useQueryState<EventDateState>(eventDateQueryKey, initialState)

	/**
	 * 사용자가 input에서 선택한 날짜를 기반으로 전역 상태를 업데이트하는 함수.
	 * 날짜 계산 로직이 모두 여기에 캡슐화됩니다.
	 * @param date YYYY-MM-DD 형식의 날짜 문자열
	 */
	const setEventDate = (date: string) => {
		if (date) {
			const selected = parseDateString(date)
			const start = addDays(selected, -5)
			const end = addDays(selected, 8)
			setState({
				eventDate: date,
				rentalStart: formatDateToSQL(start),
				rentalEnd: formatDateToSQL(end),
			})
		} else {
			// 날짜가 비워지면 초기 상태로 리셋
			setState(initialState)
		}
	}

	return { ...state, setEventDate }
}
