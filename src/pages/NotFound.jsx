import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common/ui.jsx';
export default function NotFound() {
  return <EmptyState title="Page not found" text="That page doesn't exist." action={<Link to="/" className="font-medium text-emerald-600 hover:underline">Back to dashboard</Link>} />;
}
