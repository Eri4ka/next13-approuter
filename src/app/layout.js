import { Header } from '@/components/header/Header';
import '@/styles/globals.scss';
import { Inter } from 'next/font/google';
import { SWRProvider } from './swr-provider';
import { checkAuth } from '@/utils/helpers/checkAuth';
import { AuthManager } from './auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task tracker',
  description: 'testint next.js 13 features',
};

export default async function RootLayout({ children }) {
  const isAuthorized = await checkAuth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRProvider>
          <AuthManager isAuthorized={isAuthorized}>
            <Header />
            <main className="wrapper">{children}</main>
            <div id="modal-root"></div>
          </AuthManager>
        </SWRProvider>
      </body>
    </html>
  );
}
