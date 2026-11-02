import { useSyncExternalStore } from 'react';
import { ArrowUp } from 'lucide-react';
function subscribeScroll(notify: () => void) {
  window.addEventListener('scroll', notify, { passive: true });
  return () => window.removeEventListener('scroll', notify);
}
const scrolledDown = () => window.scrollY > 600;
const initialScroll = () => false;
export function BackToTop() {
  const visible = useSyncExternalStore(
    subscribeScroll,
    scrolledDown,
    initialScroll,
  );
  if (!visible) return null;
  return (
    <button
      type="button"
      className="back-to-top no-print"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => {
        document.getElementById('main')?.focus({ preventScroll: true });
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
        });
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
