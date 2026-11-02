import { useEffect, useRef } from 'react';
const revealSelector = [
  '.section-heading',
  '.stat',
  '.research-item',
  '.publication-card',
  '.activity-card',
  '.voice',
  '.cv-callout',
  '.interest-grid>div',
  '.timeline>article',
  '.directory-grid>.academic-card',
  '.achievements-home .academic-card',
  '.profile-panel',
  '.detail-content',
  '.metadata-panel',
  '.contact-grid>div',
].join(',');
function observeContent(root: HTMLDivElement) {
  const observed = new WeakSet<HTMLElement>();
  const running = new Set<Animation>();
  let frame = 0;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement))
          continue;
        const target = entry.target;
        observer.unobserve(target);
        const siblings = Array.from(
          target.parentElement?.children ?? [],
        ).filter((el) => el.matches(revealSelector));
        const delay = Math.min(Math.max(siblings.indexOf(target), 0) * 50, 150);
        target.classList.add('motion-reveal');
        if (typeof target.animate !== 'function') continue;
        const animation = target.animate(
          [
            { opacity: 0.15, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 380,
            delay,
            easing: 'cubic-bezier(0.22,1,0.36,1)',
            fill: 'backwards',
          },
        );
        running.add(animation);
        animation.onfinish = () => running.delete(animation);
        animation.oncancel = () => running.delete(animation);
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
  );
  function scan() {
    for (const element of root.querySelectorAll<HTMLElement>(revealSelector)) {
      if (observed.has(element)) continue;
      observed.add(element);
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top < window.innerHeight - 24) continue;
      observer.observe(element);
    }
  }
  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(scan);
  }
  const mutation = new MutationObserver((records) => {
    if (records.some((record) => record.addedNodes.length > 0)) schedule();
  });
  mutation.observe(root, { childList: true, subtree: true });
  schedule();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    mutation.disconnect();
    for (const animation of running) animation.cancel();
    running.clear();
  };
}
export function usePageMotion(pageKey: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};
    const configure = () => {
      stop();
      stop = preference.matches ? () => {} : observeContent(root);
    };
    configure();
    preference.addEventListener('change', configure);
    return () => {
      preference.removeEventListener('change', configure);
      stop();
    };
  }, [pageKey]);
  return ref;
}
