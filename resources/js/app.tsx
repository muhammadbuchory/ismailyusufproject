import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
createInertiaApp({
  title: (title) => title + ' | Ismail Yusuf · Academic Portfolio',
  resolve: async () => {
    const page = await import('./pages/Portfolio');
    return page.default;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: { color: '#daa73f' },
});
