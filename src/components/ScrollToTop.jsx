import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollTop() {
  const location = useLocation();

  useEffect(() => {
    // A setTimeout biztosítja, hogy az oldal tartalma már renderelődött legyen
    const timer = setTimeout(() => {
      window.scrollTo(0, 0); 
    }, 0);
    
    // Törölni a timer-t ha a komponens eltűnik
    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
