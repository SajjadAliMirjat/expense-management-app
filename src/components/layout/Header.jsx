import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const titles = { '/': 'Dashboard', '/transactions': 'Transactions', '/income': 'Income', '/expenses': 'Expenses', '/categories': 'Categories', '/settings': 'Settings' };

export default function Header({ onMenu }) {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button onClick={onMenu} aria-label="Open menu" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
        <Menu size={20} />
      </button>
      <h1 className="text-lg font-semibold">{titles[pathname] ?? 'Not found'}</h1>
      <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">AK</span>
    </header>
  );
}
