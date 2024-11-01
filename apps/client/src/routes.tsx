import { createBrowserRouter, Navigate } from 'react-router-dom';
import InDev from './pages/errors/InDev';
import ProtectedLayout from './components/custom/layout';
import PortalHome from './pages/portal';
import NotFound from './pages/errors/404';
import FolderData from './pages/portal/folder';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import MyProfile from './pages/portal/my-account/profile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: () => {
      return <Navigate to="/portal" />;
    },
  },
  {
    path: '/portal/my-account/*',
    element: (
      <ProtectedLayout>
        <MyProfile />
      </ProtectedLayout>
    ),
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
    path: '/auth/login',
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
  {
    errorElement: <NotFound />,
    path: '/auth/register',
    element: <RegisterPage />,
  },
]);
