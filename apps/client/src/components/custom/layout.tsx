import AppSidebar from './app-sidebar';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { PanelLeft } from 'lucide-react';

export default function ProtectedLayout(props: { children: React.ReactNode }) {
  const auth = useRecoilValue(authState);

  if (!auth.token) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className=" flex flex-row bg-neutral-100">
      <SidebarProvider>
        <div>
          <AppSidebar />
        </div>

        <div className="border rounded-md w-screen m-1 p-3 bg-white ">
          <div className="my-2">
            <SidebarTrigger>
              <PanelLeft width={40} height={40} />
            </SidebarTrigger>
          </div>
          {props.children}
        </div>
      </SidebarProvider>
    </div>
  );
}
