import Link from 'next/link';
import { Users } from 'lucide-react';

export default function Logo() {
  return (
    <Link href={'/'}>
      <div className="flex items-center space-x-2">
        <div className="bg-red-600 p-2 rounded-lg">
          <Users className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl text-white font-bold">TeamDraft</span>
      </div>
    </Link>
  );
}