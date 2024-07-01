import { Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import { UnauthorizedException } from '~/Auth/exceptions';
import AuthMe, { authMeSchema } from '~/Auth/types/Me';
import CommonLayout from '~/Common/components/Layout';
import { getAuthCookie } from '~/auth-cookie';
import env from '~/env';

// utility
async function fetchMe(
  accessToken: string,
  apiBaseUrl: string,
): Promise<AuthMe> {
  const url = new URL('auth/me', apiBaseUrl);
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new UnauthorizedException();
    } else {
      throw new Error(
        'Unexpected error occurred while fetching `GET /auth/me`.',
      );
    }
  }
  const data = await res.json();
  return authMeSchema.parse(data);
}

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
      <Typography variant="body1">Index route</Typography>
    </CommonLayout>
  );
}
