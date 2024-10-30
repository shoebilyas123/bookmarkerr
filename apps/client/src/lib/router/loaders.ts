import { isUserAuthenticated } from '../auth';
import { redirect } from 'react-router-dom';

export async function authorize() {
  const auth = await isUserAuthenticated();
  if (!auth) {
    return redirect('/auth/login');
  }

  return auth;
}
