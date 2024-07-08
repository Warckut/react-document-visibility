import { useState, useEffect, useCallback } from 'react';

function useDocumentVisibility() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const cb = () => {
      setVisible(!document.hidden);
      if (!document.hidden) setCount((v) => v + 1);
    };

    document.addEventListener('visibilitychange', cb);
    return () => document.removeEventListener('visibilitychange', cb);
  }, []);

  const onVisibilityChange = useCallback((handler: (visible: boolean) => void) => {
    const callback = () => {
      handler(!document.hidden);
    };

    document.addEventListener('visibilitychange', callback);
    return () => document.removeEventListener('visibilitychange', callback);
  }, []);

  return { count, visible, onVisibilityChange };
}

export default useDocumentVisibility;
