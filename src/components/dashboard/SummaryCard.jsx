const tones = { green: 'bg-emerald-50 text-emerald-600', red: 'bg-rose-50 text-rose-600', slate: 'bg-slate-100 text-slate-600' };

export default function SummaryCard({ label, value, icon: Icon, tone = 'slate', hint, valueClass = '' }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone]}`}><Icon size={18} aria-hidden="true" /></span>
      </div>
      <p className={`mt-3 truncate text-2xl font-semibold tabular-nums ${valueClass}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
