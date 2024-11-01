import { Github, HomeIcon, User2 } from 'lucide-react';

interface SidebarGroupMenu {
  // @ts-ignore
  Icon: any;
  title: string;
  variant?: 'outline' | 'default' | null;
  action: {
    href: string;
    target?: '_blank';
  };
}
interface SidebarGroupData {
  name: string;
  menu: SidebarGroupMenu[];
}

export const SIDEBAR_GROUPS: SidebarGroupData[] = [
  {
    name: 'Application',
    menu: [
      {
        Icon: HomeIcon,
        title: 'Home',
        action: { href: '/portal' },
      },
    ],
  },

  {
    name: 'My Account',
    menu: [
      {
        Icon: User2,
        title: 'Profile',
        variant: 'default',
        action: {
          href: '/portal/my-account/profile',
        },
      },
      // {
      //   Icon: Settings2,
      //   title: 'Settings',
      //   variant: 'default',
      //   action: {
      //     href: '/portal/my-account/settings',
      //   },
      // },
    ],
  },

  {
    name: 'Contribute',
    menu: [
      {
        Icon: Github,
        title: 'Github Repo',
        action: {
          href: 'https://github.com/shoebilyas123/bookmarkerr',
          target: '_blank',
        },
      },
    ],
  },
];
