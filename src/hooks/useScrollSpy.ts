import { useEffect, useState } from 'react';

/** A thin band at 35% of the viewport height decides which section counts as current. */
const BAND_MARGIN = '-35% 0px -64% 0px';

/**
 * Returns the id of the section crossing the band, or null.
 * Pass something that changes with the page (like the pathname) as `pageKey`
 * so sections of a new page get observed.
 */
export const useScrollSpy = (ids: readonly string[], pageKey: string) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const crossing = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) crossing.add(target.id);
          else crossing.delete(target.id);
        });
        setActiveId(ids.find((id) => crossing.has(id)) ?? null);
      },
      { rootMargin: BAND_MARGIN },
    );
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
      setActiveId(null);
    };
  }, [ids, pageKey]);

  return activeId;
};
