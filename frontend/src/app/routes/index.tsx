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
import AnalysisList from '@/pages/mypage/AnalysisList';
import ConsultationList from '@/pages/mypage/ConsultationList';
import ReservationList from '@/pages/mypage/Reservationlist';
import ReviewList from '@/pages/mypage/ReviewList';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <Login />,
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
    ],
  },
]);

export default router;
