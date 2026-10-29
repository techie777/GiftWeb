'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const AdminPanel = dynamic(() => import('../../components/AdminPanel'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Loading Admin Console...</p>
      </div>
    </div>
  ),
});

export default function AdminPage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen bg-slate-950">
      <AdminPanel onClose={() => router.push('/')} />
    </main>
  );
}
