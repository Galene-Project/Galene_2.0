import { useEffect, useCallback, useRef } from 'react';

function useCtrlAltA(callback) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback();
    }, 300);
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && !event.repeat && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        debouncedCallback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedCallback]);
}

export default useCtrlAltA;

/*
Usage example:

function MyComponent() {
  useCtrlAltA(() => {
    console.log('Ctrl+Alt+A pressed!');
  });

  return <div>Press Ctrl+Alt+A</div>;
}
*/
