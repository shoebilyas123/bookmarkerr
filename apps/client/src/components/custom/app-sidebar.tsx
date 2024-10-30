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

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Articles Shelf</SidebarHeader>
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
                          item.variant as
                            | 'outline'
                            | 'default'
                            | null
                            | undefined
                        }
                        asChild
                      >
                        <a href={item.action.href}>
                          <item.Icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <form>
            <SidebarMenuButton variant="outline" type="submit">
              <LogOutIcon className="text-red-600" />
              <span>Logout</span>
            </SidebarMenuButton>
          </form>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
