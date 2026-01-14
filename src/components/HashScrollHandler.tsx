import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }
    const hash = location.hash?.replace('#', '');
    if (!hash) {
      return;
    }
    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return null;
}
