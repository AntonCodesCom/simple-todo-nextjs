import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

// font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

// metadata
export const metadata: Metadata = {
  title: 'Simple Todo',
  description: 'A Todo application built with Next.js and NestJS.',
};

/**
 * Root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
