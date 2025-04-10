"use client";
import { Roboto } from 'next/font/google';
import './globals.css';
import NavbarTheme from '@/components/NavBar/NavBar';
import SideBar from '@/components/SideBar';
import { usePathname } from "next/navigation";
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

const inter = Roboto({ subsets: ['latin'], weight: '700' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noSideBar = ["/auth/login", "/auth/register", "/"]
  const info = "/info"
  const NoSideBarPaths = (noSideBar.includes(pathname) || pathname.startsWith(info) );

  return (
    <html lang="en" className="dark">
      <title>TeamDraft</title>
      
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200`}>
        <SessionProvider> 
          <NavbarTheme />
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className="flex-row flex pr-1">
            {!NoSideBarPaths && <SideBar />}
            {children}
          </div>

          <div className='flex size-full'>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
