import AppSidebar from './app-sidebar';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import { Navigate } from 'react-router-dom';

export default function ProtectedLayout(props: { children: React.ReactNode }) {
  const auth = useRecoilValue(authState);

  if (!auth.token) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className=" flex flex-row bg-neutral-100">
      <div>
        <AppSidebar />
      </div>

      <div className="border rounded-md w-screen m-1 p-3 bg-white ">
        {props.children}
      </div>
    </div>
  );
}
