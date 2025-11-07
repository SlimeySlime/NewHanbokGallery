/**
 * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환합니다. (input[type="date"]용)
 * @param date 변환할 Date 객체
 * @returns 'YYYY-MM-DD' 형식의 문자열
 */
export function formatDateToInput(date: Date): string {
	return date.toISOString().split('T')[0]
}

/**
 * 'YYYY-MM-DD' 형식의 문자열을 Date 객체로 파싱합니다.
 * @param dateString 'YYYY-MM-DD' 형식의 문자열
 * @returns Date 객체
 */
export function parseDateString(dateString: string): Date {
	return new Date(dateString)
}

/**
 * 주어진 날짜에 특정 일수를 더하거나 뺍니다.
 * @param date 기준 Date 객체
 * @param daysToAdd 더하거나 뺄 일수 (음수 가능)
 * @returns 계산된 새로운 Date 객체
 */
export function addDays(date: Date, daysToAdd: number): Date {
	const newDate = new Date(date)
	newDate.setDate(date.getDate() + daysToAdd)
	return newDate
}

/**
 * Date 객체를 'YYYYMMDD' 형식의 SQL용 문자열로 변환합니다.
 * @param date 변환할 Date 객체
 * @returns 'YYYYMMDD' 형식의 문자열
 */
export function formatDateToSQL(date: Date): string {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}${month}${day}`
}