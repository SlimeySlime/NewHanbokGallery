// import React from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import Hero from '../components/Hero'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useMediaQuery } from 'react-responsive'
const { kakao } = window

export default function Home() {

  const prevNavigation = useRef(null)
  const nextNavigation = useRef(null)

  const [mapLoaded, setMapLoaded] = useState(true)

  const isMobile = useMediaQuery({
    query: '(max-width : 760px)'
  })

  // kakao map
  useEffect(() => {
    if (kakao) {
      const container = document.getElementById('map')
      // console.log('kakao is not null')
      // console.log(kakao)

      const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(36.614393, 127.445494), //지도의 중심좌표.  
        level: 4 //지도의 레벨(확대, 축소 정도)
      };
      const map = new kakao.maps.Map(container, options)
      // 마커
      // const markerPosition = new kakao.maps.LatLng(36.614393, 127.445494)
      const markerPosition = new kakao.maps.LatLng(36.615264, 127.445659)
      const marker = new kakao.maps.Marker({
        position: markerPosition
      })
      marker.setMap(map)
      // zoom + skyview
      const zoom = new kakao.maps.ZoomControl()
      map.addControl(zoom, kakao.maps.ControlPosition.BOTTOMRIGHT)
      const mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      setMapLoaded(true)
      console.log('kakao api and map loaded successfully')

    } else {
      setMapLoaded(false)
      console.log('kakao api is null')
      console.log(kakao)
    }


  }, [])


  return (
    <main>
      <Hero />
      {/* <div className='carousel-container'>
            <div className='carousel-item'>dd</div>
            <div className='carousel-item'>dd</div>
            <div className='carousel-item'>dd</div>
            <div className='carousel-item'>dd</div>
        </div> */}
      <div className="p-6">


        <div className="container justify-center w-auto mx-24 my-8 mobile:m-4">
          here is swiper
          <Swiper
            pagination={true}
            navigation={{
              prevEl: prevNavigation.current,
              nextEl: nextNavigation.current,
            }}
            // onBeforeInit={{
            //     prevEl: prevNavigation.current,
            //     nextEl: nextNavigation.current,
            // }}
            modules={[Navigation, Pagination]}
            spaceBetween={12}
          // slidesPerView={isMobile ? 1 : 3}
          >
            <SwiperSlide>
              <img src="img/1.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/2.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/3.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/4.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/5.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/6.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/7.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/8.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/10.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/11.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="img/12.jpg" alt="" />
            </SwiperSlide>
            <div className="absolute top-1/2 -translate-y-1/2 float-left z-10 rounded-full border bg-white p-3 m-1 hover:bg-slate-200 
                mobile:p-1"
              ref={prevNavigation}><MdArrowBackIos /></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 float-right z-10 rounded-full border bg-white p-3 m-1 hover:bg-slate-200
                mobile:p-1"
              ref={nextNavigation}><MdArrowForwardIos /></div>
          </Swiper>
        </div>
        
        {/* 오시는 길 */}
        <div className="flex flex-col w-auto h-auto m-4 p-1 gap-4 gap-y-4">
          <h1 className='text-xl font-thin'>오시는 길</h1>
          <h2 className='text-xl font-thin'>/</h2>
          {/* <p>비단본가</p> */}
          <h2 className='font-bold text-xl text-teal-800'>충북 청주시 성화로 112</h2>
          
          {/* 지도 컨테이너에 max-width 및 중앙 정렬 추가 */}
          <div className="max-w-5xl mx-auto w-full mt-8"> 
            {mapLoaded ?
              <div id='map' className="w-52 f-52 relative"
                style={{
                  width: 'auto',
                  height: isMobile ? '300px' : '500px'
                }} />
              : <div />}
          </div>


          <div id='contact' className="mt-16 max-w-md mx-auto text-start">
            <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-8">
              <span className="font-semibold">주소</span>
              <div className="flex flex-col">
                <span>충북 청주시 서원구 성화로 112 비단본가</span>
                <span>주차가능</span>
              </div>
              <span className="font-semibold">전화번호</span>
              <span>043-234-5165</span>
              <span className="font-semibold">영업시간</span>
              <div className="flex flex-col">
                <span>11:00 ~ 18:00</span>
                <span>화요일 휴무   </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}