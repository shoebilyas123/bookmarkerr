import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenu,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { LogOutIcon } from 'lucide-react';
import { SIDEBAR_GROUPS } from '@/lib/ui/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './logo';

export default function AppSidebar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    localStorage.clear();
    navigate(0);
  };
  return (
    <Sidebar>
      <SidebarHeader className="px-4 ">
        <div className="flex items-center space-x-2">
          <Logo />
          <Link to={'/portal'} className="font-medium text-slate-700">
            BookMarkerr <sub>Beta 0.0.1</sub>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_GROUPS.map((grp, index) => (
          <SidebarGroup key={grp.name + index}>
            <SidebarGroupLabel>{grp.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {grp.menu.map((item, index) => (
                  <SidebarMenuItem
                    key={index + item.title + Math.random().toString(6)}
                  >
                    <SidebarMenuButton
                      variant={
                        item.variant as 'outline' | 'default' | null | undefined
                      }
                      asChild
                    >
                      {item.action.target ? (
                        <a href={item.action.href} target={item.action.target}>
                          <item.Icon />
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <Link to={item.action.href}>
                          <item.Icon />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          onClick={logoutHandler}
          variant="outline"
          type="submit"
        >
          <LogOutIcon className="text-red-600" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
