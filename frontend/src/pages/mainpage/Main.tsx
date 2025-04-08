import MainHeader from '@/features/mainpage/MainHeader';
import MainFunctions from '@/features/mainpage/MainFunctions';
import Guideline from '@/features/mainpage/Guideline';
import AiAnalysis from '@/features/mainpage/AiAnalysis';
import LawyerConsulting from '@/features/mainpage/LawyerConsulting';
import LawyerRegist from '@/features/mainpage/LawyerRegist';

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import './Main.css';

const Main = () => {
  // 컴포넌트 마운트 시 AOS 초기화 또는 refresh
  useEffect(() => {
    Aos.init({
      duration: 0,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      {/* 상단 이미지 & 버튼 */}
      <MainHeader />

      {/* 메인 컨텐츠 */}
      <main className="w-[1200px]">
        {/* 핵심 기능 3가지 소개 */}
        <MainFunctions />

        {/* 이용 방법 */}
        <Guideline />

        {/* AI 사고 분석 */}
        <AiAnalysis />

        {/* 변호사 상담 신청 */}
        <LawyerConsulting />

        {/* 변호사이신가요? */}
        <LawyerRegist />
      </main>
    </>
  );
};

export default Main;
