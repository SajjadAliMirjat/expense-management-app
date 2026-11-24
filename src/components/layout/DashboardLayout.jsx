import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { useExpense } from '../../hooks/useExpense';

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toasts } = useExpense();
  return (
    <div className="min-h-screen">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <Header onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
      <div className="fixed bottom-4 right-4 z-[60] space-y-2" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
            {t.type === 'error' ? <XCircle size={16} className="text-rose-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
