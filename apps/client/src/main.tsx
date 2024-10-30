import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PortalHome from './pages/portal/index.tsx';
import ProtectedLayout from './components/custom/layout.tsx';
import NotFound from './pages/errors/404.tsx';
import FolderData from './pages/portal/folder/index.tsx';
import LoginPage from './pages/auth/login.tsx';
import RegisterPage from './pages/auth/register.tsx';

import { RecoilRoot } from 'recoil';
import InDev from './pages/errors/InDev.tsx';

const router = createBrowserRouter([
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
    path: '/portal/folder/:id',
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>
);
