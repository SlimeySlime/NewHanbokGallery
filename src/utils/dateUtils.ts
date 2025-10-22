export function parseDateString(dateStr: string): Date {
	// 'YYYY-MM-DD' -> Date (midnight)
	return new Date(dateStr + 'T00:00:00')
}

export function formatDateToISODateString(date: Date): string {
	// Date -> 'YYYY-MM-DD'
	return date.toISOString().slice(0, 10)
}

export function formatDateToSQL(date: Date): string {
	// Date -> 'YYYYMMDD'
	const y = date.getFullYear()
	const m = String(date.getMonth() + 1).padStart(2, '0')
	const d = String(date.getDate()).padStart(2, '0')
	return `${y}${m}${d}`
}

export function sqlToDateString(sql: string): string {
	// 'YYYYMMDD' -> 'YYYY-MM-DD'
	if (!sql || sql.length !== 8) return sql
	return `${sql.slice(0, 4)}-${sql.slice(4, 6)}-${sql.slice(6, 8)}`
}

export function addDays(date: Date, days: number): Date {
	const d = new Date(date)
	d.setDate(d.getDate() + days)
	return d
}
