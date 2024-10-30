import { authState } from '@/store/auth';
import { UserAuthenticated } from '@/types/db';
import { useRecoilValue } from 'recoil';

export async function isUserAuthenticated(): Promise<
  { auth: UserAuthenticated } | false
> {
  const auth = useRecoilValue(authState);

  if (!auth) return false;

  return { auth };
}
