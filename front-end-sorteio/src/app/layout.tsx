"use client"
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import NavbarTheme from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { usePathname } from "next/navigation";
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';

const inter = Roboto({ subsets: ['latin'], weight: '600' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const UserPage = pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/home";
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.theme;
              const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              if (theme === "dark" || (!theme && prefersDark)) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-slate-900 to-slate-950 custom-bg `}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        <div className="">
          <NavbarTheme />
          <div className="flex-row flex pr-1">
            
            {!UserPage && <SideBar />}

            {children}
          </div>

          <div className='flex size-full'>
            <Footer/>
          </div>
        
        </div>
        
      </body>
    </html>
  );
}
