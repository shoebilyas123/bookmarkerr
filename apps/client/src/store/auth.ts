import { UserAuthenticated } from '@/types/db';
import { Folder } from '@/types/folder';
import { atom } from 'recoil';

console.log(window);

const authInitialState: UserAuthenticated =
  window && window.localStorage.getItem('auth')
    ? JSON.parse(window.localStorage.getItem('auth') || '')
    : {
        token: null,
        user: null,
      };

const folderInitialState: (Omit<Folder, 'articles'> & { articles: number })[] =
  [];
export const authState = atom<UserAuthenticated>({
  key: 'auth:user',
  default: authInitialState,
});

export const folderState = atom<
  (Omit<Folder, 'articles'> & { articles: number })[]
>({
  key: 'user:folders',
  default: folderInitialState,
});
