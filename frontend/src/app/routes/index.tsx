import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/widgets/Layout';
import Login from '@/pages/login/Login';
import Main from '@/pages/mainpage/Main';
import VideoUpload from '@/pages/analysis/VideoUpload';
import ConsultUpload from '@/pages/consultation/ConsultUpload';
import ConsultDetail from '@/pages/consultation/ConsultDetail';
import Board from '@/pages/board/Board';
import MyPage from '@/pages/mypage/MyPage';

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
    ],
  },
]);

export default router;
