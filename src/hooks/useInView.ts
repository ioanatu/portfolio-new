import { type RefObject, useEffect, useState } from 'react';

/** Turns true once the element nears the viewport, and stays true so work started by it isn't undone. */
export const useInView = (ref: RefObject<Element | null>, rootMargin = '0px') => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (inView || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
};
