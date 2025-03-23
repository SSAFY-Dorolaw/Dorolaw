import { createBrowserRouter } from 'react-router-dom';
import Main from '@/pages/mainpage/Main';
import VideoUpload from '@/pages/analysis/VideoUpload';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/upload',
    element: <VideoUpload />,
  },
]);

export default router;
