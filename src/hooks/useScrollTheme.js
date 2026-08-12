import { useState, useEffect, useCallback } from 'react';

const THEME_MAP = {
  'Section - HERO - Marquee Hero macrostructure': 'dark',
  'Section - Trusted by partners': 'dark',
  'Section - Problems': 'light',
  'Section - work': 'light',
  'Section - Services': 'light',
  'Section - Why': 'dark',
  'Section - Testimonials': 'dark',
  'Section - FAQ': 'light',
  'Section - Form': 'light',
  'Footer': 'dark',
};

const NAV_BOTTOM = 100;

export default function useScrollTheme(defaultTheme = 'dark') {
  const [theme, setTheme] = useState(defaultTheme);

  const check = useCallback(() => {
    const sections = document.querySelectorAll('[data-name]');
    const viewTop = window.scrollY + NAV_BOTTOM;

    for (const el of sections) {
      const rect = el.getBoundingClientRect();
      const absTop = window.scrollY + rect.top;
      const absBottom = absTop + rect.height;

      if (absTop <= viewTop && absBottom > viewTop) {
        const name = el.getAttribute('data-name');
        if (THEME_MAP[name]) {
          setTheme(THEME_MAP[name]);
          return;
        }
      }
    }
  }, []);

  useEffect(() => {
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [check]);

  return theme;
}
