import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { parseDateString, addDays, formatDateToSQL } from '../../utils/dateUtils'

// 이 슬라이스가 관리할 상태의 타입 정의
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

export const eventDateSlice = createSlice({
	name: 'eventDate',
	initialState,
	// 리듀서: 상태를 변경하는 함수들의 모음
	reducers: {
		// `setEventDate`라는 액션(action)을 정의
		setEventDate: (state, action: PayloadAction<string>) => {
			const date = action.payload
			
			if (date) {
				const selected = parseDateString(date)
				const start = addDays(selected, -5)
				const end = addDays(selected, 8)
				state.eventDate = date
				state.rentalStart = formatDateToSQL(start)
				state.rentalEnd = formatDateToSQL(end)
			} else {
				// 날짜가 비워지면 초기 상태로 리셋
				state.eventDate = initialState.eventDate
				state.rentalStart = initialState.rentalStart
				state.rentalEnd = initialState.rentalEnd
			}
			console.log(`EventDate updated: eventDate=${state.eventDate}, rentalStart=${state.rentalStart}, rentalEnd=${state.rentalEnd}`)
		},
	},
})

// 다른 파일에서 액션을 사용할 수 있도록 export
export const { setEventDate } = eventDateSlice.actions

// 스토어에서 사용하기 위해 리듀서를 export
export default eventDateSlice.reducer
