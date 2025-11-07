/**
 * 쿠키를 설정합니다.
 * @param name 쿠키의 이름
 * @param value 쿠키의 값
 * @param days 만료 기간 (일)
 */
export function setCookie(name: string, value: string, days: number) {
	let expires = ''
	if (days) {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = '; expires=' + date.toUTCString()
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

/**
 * 이름으로 쿠키를 가져옵니다.
 * @param name 쿠키의 이름
 * @returns 쿠키의 값 또는 null
 */
export function getCookie(name: string): string | null {
	const nameEQ = name + '='
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) === ' ') c = c.substring(1, c.length)
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}
