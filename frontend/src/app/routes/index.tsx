import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/widgets/Layout';
import Main from '@/pages/mainpage/Main';
import VideoUpload from '@/pages/analysis/VideoUpload';
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'upload',
        element: <VideoUpload />,
      },
    ],
  },
]);

export default router;
