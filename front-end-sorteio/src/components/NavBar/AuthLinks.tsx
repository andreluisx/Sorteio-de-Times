import Link from 'next/link';
import { signOut } from 'next-auth/react';

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
          <p className="px-4 py-2 text-white">DashBoard</p>
        </Link>
        <button onClick={handleLogout} className="cursor-pointer">
          <p className="px-4 py-2 text-white">Sair</p>
        </button>
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
