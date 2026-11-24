import { NavLink } from 'react-router-dom';
import { ArrowLeftRight, LayoutDashboard, Settings, Tags, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const links = [
  ['/', 'Dashboard', LayoutDashboard],
  ['/transactions', 'Transactions', ArrowLeftRight],
  ['/income', 'Income', TrendingUp],
  ['/expenses', 'Expenses', TrendingDown],
  ['/categories', 'Categories', Tags],
  ['/settings', 'Settings', Settings],
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white"><Wallet size={18} /></span>
          <span className="font-semibold leading-tight">Expense Management App</span>
        </div>
        <nav className="flex-1 space-y-1 p-3" aria-label="Main navigation">
          {links.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`
              }
            >
              <Icon size={18} aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-t border-slate-100 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">AK</span>
          <div className="min-w-0 text-sm">
            <p className="truncate font-medium">Ali Khan</p>
            <p className="truncate text-xs text-slate-500">ali@example.com</p>
          </div>
        </div>
      </aside>
    </>
  );
}
