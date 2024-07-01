import { redirect } from 'next/navigation';
import { deleteAuthCookie } from '~/auth-cookie';

export async function GET() {
  deleteAuthCookie();
  return redirect('/login');
}
