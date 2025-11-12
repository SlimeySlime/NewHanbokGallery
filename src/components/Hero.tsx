// import React from 'react'
import bdanbonga_logo from '../assets/img/main/bdanbonga_text.png'

export default function Hero() {


	const Gradient = (text, style) => {
        return(
            <p className={"text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600 " + style}>{text}</p>
        )
    }

	return (
		<main
			className="relative w-full h-screen"
			style={{
				backgroundImage: "url('/mainhanbok.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}}
		>
			{/* 전체 오버레이: 화면 100% 커버 */}
			<div className="absolute inset-0 bg-black/10 z-10"></div>

			{/* main_text: 왼쪽 50%만 차지하도록 변경 */}
			<div id='main_text' className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center px-4 z-20">
				<div className="flex flex-col justify-center items-center m-12 mobile:m-2">
					<img id="logo" src={bdanbonga_logo} alt="" />
					
                    {/* {Gradient('전품목 7만 7천원 균일가 대여', "text-4xl font-preten font-semibold mobile:text-2xl")} */}
                    <p className="text-3xl font-preten font-semibold">전품목 77,000원 균일가 대여 </p>
                    <p className="font-preten font-semibold pb-12 from-blue-500 to-white">
                        ( 부가세 포함, 배송비 별도)
                    </p>
                    <p className="text-2xl font-preten font-semibold text-center pb-8
                                mobile:text-lg mobile:p-2">
                        한분 한분께 최선을 다하고자 <br />
                        <b className="text-red-500">예약제</b>로 운영중입니다.
                    </p>
                    {/* <p className="text-lg font-preten font-semibold">( 예약문의 043 - 234 - 5165 )</p>     */}
                </div>
			</div>
		</main>
	)
}
