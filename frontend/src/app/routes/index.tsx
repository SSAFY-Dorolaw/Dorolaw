import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/widgets/Layout';
import Login from '@/pages/login/Login';
import Main from '@/pages/mainpage/Main';
import VideoUpload from '@/pages/analysis/AnalysisUpload';
import ConsultUpload from '@/pages/consultation/ConsultUpload';
import ConsultDetail from '@/pages/consultation/ConsultDetail';
import AnalysisDetail from '@/pages/analysis/AnalysisDetail';
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
import LawyerAuthenticationForm from '@/pages/mypage/lawyer/LawyerAuthenticationForm';
import LawyerRequests from '@/pages/reservation/LawyerRequests';
import ConsultationBoard from '@/pages/board/ConsultationBoard';
import NotFound from '@/pages/errors/NotFound';
import ErrorPage from '@/pages/errors/ErrorPage';
import ErrorHandler from '@/pages/errors/ErrorHandler';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorHandler />,
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
        path: '/upload',
        errorElement: <ErrorHandler />,
        children: [
          {
            path: 'report',
            element: <VideoUpload />,
            loader: requireAuth,
          },
          {
            path: 'consultation',
            element: <ConsultUpload />,
            loader: requireAuth,
          },
        ],
      },
      {
        path: '/board',
        children: [
          {
            path: 'consultation',
            children: [
              {
                path: '',
                element: <ConsultationBoard />,
              },
              {
                path: ':requestId',
                element: <ConsultDetail />,
              },
            ],
          },
          {
            path: 'analysis',
            children: [
              {
                path: '',
                element: <Board />,
              },
              {
                path: ':faultAnalysisId',
                element: <AnalysisDetail />,
                errorElement: <ErrorPage />,
              },
            ],
          },
        ],
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
            path: ':lawyerId/requests',
            element: <LawyerRequests />,
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
            path: 'edit',
            element: <EditLawyerPage />,
            loader: requireAuth,
          },
          {
            path: 'authentication',
            element: <LawyerAuthenticationForm />,
            loader: requireAuth,
          },
        ],
      },
      {
        path: '/reservation/additional-question',
        element: <AdditionalQuestion />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
