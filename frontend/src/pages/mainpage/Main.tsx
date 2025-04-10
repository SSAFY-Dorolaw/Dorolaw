import MainHeader from '@/features/mainpage/MainHeader';
import MainFunctions from '@/features/mainpage/MainFunctions';
import Guideline from '@/features/mainpage/Guideline';
import AiAnalysis from '@/features/mainpage/AiAnalysis';
import LawyerConsulting from '@/features/mainpage/LawyerConsulting';
import LawyerRegist from '@/features/mainpage/LawyerRegist';

import { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import './Main.css';

const Main = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // 컴포넌트 마운트 시 AOS 초기화 및 스크롤 이벤트 리스너 추가
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 120,
      easing: 'ease-out-cubic',
    });

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 스크롤 위치에 따라 AOS refresh (필요시)
  useEffect(() => {
    Aos.refresh();
  }, [scrollPosition]);

  return (
    <>
      {/* 상단 이미지 & 버튼 */}
      <header>
        <MainHeader />
      </header>

      {/* 메인 컨텐츠 */}
      <main className="-mt-[100px] w-[1200px] space-y-16">
        {/* 핵심 기능 3가지 소개 */}
        <section data-aos="fade-up" data-aos-duration="1000">
          <MainFunctions />
        </section>

        {/* 이용 방법 */}
        <section
          className="align-center h-[calc(100dvh-128px)]"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <Guideline />
        </section>

        {/* 1) AI 사고 분석 */}
        <section
          className="align-center h-[calc(100dvh-128px)]"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <AiAnalysis />
        </section>

        {/* 2) 변호사 상담 신청 */}
        <section
          className="align-center h-[calc(100dvh-128px)]"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <LawyerConsulting />
        </section>

        {/* 3) 변호사 인증 */}
        <section
          className="align-center h-[calc(100dvh-128px)]"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="500"
        >
          <LawyerRegist />
        </section>
      </main>
    </>
  );
};
export default Main;
