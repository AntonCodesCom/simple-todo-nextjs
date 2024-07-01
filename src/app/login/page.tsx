import { redirect } from 'next/navigation';
import AuthLogin from '~/Auth/components/Login';
import { UnauthorizedException } from '~/Auth/exceptions';
import fetchMe from '~/Auth/utils/fetchMe';
import CommonLayout from '~/Common/components/Layout';
import { getAuthCookie } from '~/auth-cookie';
import env from '~/env';

// server action
async function me() {
  const { apiBaseUrl } = env();
  const authCookie = getAuthCookie();
  if (!authCookie) {
    return;
  }
  const accessToken = authCookie.value;
  try {
    await fetchMe(accessToken, apiBaseUrl);
    return redirect('/');
  } catch (err) {
    if (err instanceof UnauthorizedException) {
      return;
    }
    throw err;
  }
}

/**
 * Login route component.
 */
export default async function RouteLogin() {
  await me();
  return (
    <CommonLayout>
      <AuthLogin />
    </CommonLayout>
  );
}
