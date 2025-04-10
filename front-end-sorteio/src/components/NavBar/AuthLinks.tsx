import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

type Props = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
};

export default function AuthLinks({ status }: Props) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  if (status === 'loading') {
    return <div onClick={handleLogout} className="cursor-pointer"></div>;
  }

  if (status === 'authenticated') {
    return (
      <div className='flex flex-row gap-3 justify-center items-center'>
        <Link href={'/random-draw'}>
          <p className="px-2 py-2 text-white">Dashboard</p>
        </Link>
        <Link href={'/info/account'} className="cursor-pointer">
        <div className="relative w-10 h-10 rounded-full border-2 border-red-500 overflow-hidden mr-3">
          <Image 
            src={'/tutorial/user.png'} 
            alt="Avatar do usuário"
            width={45}
            height={45}
            className="object-cover"
          />
        </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Link
        href={'/auth/login'}
        className="px-4 py-2 rounded text-white hover:bg-slate-700 transition-colors"
      >
        Entrar
      </Link>
      <Link
        href={'/auth/Register'}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Registrar
      </Link>
    </div>
  );
}
