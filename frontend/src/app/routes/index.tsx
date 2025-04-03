import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/widgets/Layout';
import Login from '@/pages/login/Login';
import Main from '@/pages/mainpage/Main';
import VideoUpload from '@/pages/analysis/VideoUpload';
import ConsultUpload from '@/pages/consultation/ConsultUpload';
import ConsultDetail from '@/pages/consultation/ConsultDetail';
import Board from '@/pages/board/Board';
import MyPage from '@/pages/mypage/MyPage';
import Reservation from '@/pages/reservation/Reservation';
import ConsultationList from '@/pages/mypage/MyConsultations';
import ReservationList from '@/pages/mypage/MyReservations';
import ReviewList from '@/pages/mypage/MyReviews';
import MyAnalyses from '@/pages/mypage/MyAnalyses';
import LawyerMypage from '@/pages/mypage/lawyer/LawyerMypage';
import EditLawyerPage from '@/pages/mypage/lawyer/EditLawyerPage';
import LoginRedirect from '@/pages/login/Redirect';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Main /> },
      {
        path: '/login',
        children: [
          { path: '', element: <Login /> },
          { path: 'redirect', element: <LoginRedirect /> },
        ],
      },
      {
        path: '/report',
        children: [
          { path: '', element: <VideoUpload /> },
          { path: 'detail', element: <ConsultDetail /> }, // n번 게시글(ex. reportId)로 추가 수정 필요
        ],
      },
      {
        path: '/consultation',
        children: [
          {
            path: '',
            element: <ConsultUpload />,
          },
          { path: 'detail', element: <ConsultDetail /> }, // n번 게시글(ex. reportId)로 추가 수정 필요
        ],
      },
      {
        path: '/board',
        children: [{ path: '', element: <Board /> }],
      },
      {
        path: '/client',
        children: [
          {
            path: '',
            element: <MyPage />,
          },
          {
            path: 'consultations',
            element: <ConsultationList />,
          },
          {
            path: 'reservations',
            element: <ReservationList />,
          },
          {
            path: 'reviews',
            element: <ReviewList />,
          },
          {
            path: 'analyses',
            element: <MyAnalyses />,
          },
        ],
      },
      {
        path: '/lawyer',
        children: [
          {
            path: '',
            element: <LawyerMypage />,
          },
          { path: 'profile', element: <Reservation /> },
          {
            path: 'edit',
            element: <EditLawyerPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
