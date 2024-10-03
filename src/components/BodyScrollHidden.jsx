import { useEffect } from 'react';

const useBodyStyles = (isModalOpen) => {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isModalOpen) {
      // Megőrizzük a scrollbar-t és csak a görgetést tiltjuk le
      document.body.style.overflow = 'hidden';
      
      // Kompenzáljuk a scrollbar szélességét a margin-right hozzáadásával
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      // Visszaállítjuk az eredeti stílusokat
      document.body.style.overflow = '';
      document.body.style.marginRight = ''; // Eltávolítjuk a margin-right-ot
    }

    // Cleanup effect, amikor a komponens megszűnik vagy a modál bezárul
    return () => {
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
    };
  }, [isModalOpen]);
};

export default useBodyStyles;
