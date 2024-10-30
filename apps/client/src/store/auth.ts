import { UserAuthenticated } from '@/types/db';
import { atom } from 'recoil';

console.log(window);

const authInitialState: UserAuthenticated =
  window && window.localStorage.getItem('auth')
    ? JSON.parse(window.localStorage.getItem('auth') || '')
    : {
        token: null,
        user: null,
      };

export const authState = atom<UserAuthenticated>({
  key: 'auth:user',
  default: authInitialState,
});
