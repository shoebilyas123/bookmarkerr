import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RecoilRoot } from 'recoil';
import { router } from './routes.tsx';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <Toaster />
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>
);
