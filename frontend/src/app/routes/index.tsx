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
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/login/redirect',
        element: <LoginRedirect />,
      },
      { path: '/', element: <Main /> },
      { path: '/upload', element: <VideoUpload /> },
      {
        path: '/consultation',
        children: [
          {
            index: true,
            element: <ConsultUpload />,
          },
          { path: 'detail', element: <ConsultDetail /> },
          { path: 'reservation', element: <Reservation /> },
        ],
      },
      {
        path: '/board',
        element: <Board />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/client/consultations',
        element: <ConsultationList />,
      },
      {
        path: '/client/reservations',
        element: <ReservationList />,
      },
      {
        path: '/client/reviews',
        element: <ReviewList />,
      },
      {
        path: '/client/analyses',
        element: <MyAnalyses />,
      },
      {
        path: '/lawyer/mypage',
        element: <LawyerMypage />,
      },
      {
        path: '/lawyer/mypage/edit',
        element: <EditLawyerPage />,
      },
    ],
  },
]);

export default router;
