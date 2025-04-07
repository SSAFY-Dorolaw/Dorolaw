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
import MyRequests from '@/pages/mypage/MyRequests';
import MyConsultations from '@/pages/mypage/MyConsultations';
import ReviewList from '@/pages/mypage/MyReviews';
import MyAnalyses from '@/pages/mypage/MyAnalyses';
import LawyerMypage from '@/pages/mypage/lawyer/LawyerMypage';
import EditLawyerPage from '@/pages/mypage/lawyer/EditLawyerPage';
import LoginRedirect from '@/pages/login/LoginRedirect';
import { requireAuth } from '@/entities/auth/authUtils';
import AdditionalQuestion from '@/features/reservation/AdditionalQuestion';

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
          { path: '', element: <VideoUpload />, loader: requireAuth },
          { path: ':faultAnalysisId', element: <ConsultDetail /> },
        ],
      },
      {
        path: '/consultation',
        children: [
          {
            path: '',
            element: <ConsultUpload />,
            loader: requireAuth,
          },
          { path: ':requestId', element: <ConsultDetail /> },
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
            loader: requireAuth,
          },
          {
            path: 'requests',
            element: <MyRequests />,
            loader: requireAuth,
          },
          {
            path: 'consultations',
            element: <MyConsultations />,
            loader: requireAuth,
          },
          {
            path: 'reviews',
            element: <ReviewList />,
            loader: requireAuth,
          },
          {
            path: 'analyses',
            element: <MyAnalyses />,
            loader: requireAuth,
          },
        ],
      },
      {
        path: '/lawyer',
        children: [
          {
            path: '',
            element: <LawyerMypage />,
            loader: requireAuth,
          },
          {
            path: 'profile/:lawyerId/:requestId',
            element: <Reservation />,
            loader: requireAuth,
          },
          {
            path: 'edit',
            element: <EditLawyerPage />,
            loader: requireAuth,
          },
        ],
      },
      {
        path: '/reservation/additional-question',
        element: <AdditionalQuestion />,
      },
    ],
  },
]);

export default router;
