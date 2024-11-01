import { createBrowserRouter } from 'react-router-dom';
import InDev from './pages/errors/InDev';
import ProtectedLayout from './components/custom/layout';
import PortalHome from './pages/portal';
import NotFound from './pages/errors/404';
import FolderData from './pages/portal/folder';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import instance from './lib/api';

export const router = createBrowserRouter([
  {
    path: '/portal/my-account/*',
    element: <InDev />,
    errorElement: <InDev />,
  },
  {
    path: '/portal',
    element: (
      <ProtectedLayout>
        <PortalHome />
      </ProtectedLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/portal/:id',
    element: (
      <ProtectedLayout>
        <FolderData />
      </ProtectedLayout>
    ),
  },
  {
    path: '/auth',
    errorElement: <NotFound />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },

      {
        path: '/auth/register',
        element: <RegisterPage />,
      },
    ],
  },
]);
