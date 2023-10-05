import { useRef, useEffect } from 'react';

export function useOutsideClick(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [callback]);

  return { ref };
}
