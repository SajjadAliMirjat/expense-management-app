import { Briefcase, Building2, Car, Coffee, Film, Gift, GraduationCap, HeartPulse, Home, Laptop, Plane, Receipt, ShoppingBag, Tag, TrendingUp, Utensils } from 'lucide-react';

const icons = { Briefcase, Building2, Car, Coffee, Film, Gift, GraduationCap, HeartPulse, Home, Laptop, Plane, Receipt, ShoppingBag, Tag, TrendingUp, Utensils };

export default function CategoryIcon({ category, size = 36 }) {
  const Icon = icons[category.icon] ?? Tag;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg"
      style={{ width: size, height: size, backgroundColor: `${category.color}1f`, color: category.color }}
    >
      <Icon size={size * 0.5} aria-hidden="true" />
    </span>
  );
}
