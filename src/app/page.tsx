import { Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import { UnauthorizedException } from '~/Auth/exceptions';
import fetchMe from '~/Auth/utils/fetchMe';
import CommonLayout from '~/Common/components/Layout';
import TodoMain from '~/Todo/components/Main';
import { getAuthCookie } from '~/auth-cookie';
import env from '~/env';

// server action
async function me() {
  const { apiBaseUrl } = env();
  const authCookie = getAuthCookie();
  if (!authCookie) {
    return redirect('/login');
  }
  const accessToken = authCookie.value;
  try {
    const { username } = await fetchMe(accessToken, apiBaseUrl);
    return username;
  } catch (err) {
    if (err instanceof UnauthorizedException) {
      return redirect('/login');
    }
    throw err;
  }
}

/**
 * Index route component.
 */
export default async function RouteIndex() {
  const username = await me();
  return (
    <CommonLayout username={username}>
      <TodoMain todos={[]} />
    </CommonLayout>
  );
}
