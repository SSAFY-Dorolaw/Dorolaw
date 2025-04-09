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
      <main className="w-[1200px]">
        {/* 핵심 기능 3가지 소개 */}
        <nav data-aos="fade-up" data-aos-duration="1000">
          <MainFunctions />
        </nav>

        {/* 이용 방법 */}
        <nav data-aos="fade-up" data-aos-duration="1000">
          <Guideline />
        </nav>

        {/* 1) AI 사고 분석 */}
        <nav data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
          <AiAnalysis />
        </nav>

        {/* 2) 변호사 상담 신청 */}
        <nav
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <LawyerConsulting />
        </nav>

        {/* 3) 변호사 인증 */}
        <nav data-aos="slide-up" data-aos-duration="1200">
          <LawyerRegist />
        </nav>
      </main>
    </>
  );
};

export default Main;
