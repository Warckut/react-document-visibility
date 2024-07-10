import { useState, useEffect, useCallback } from 'react';

function subscribeToVisibilitychange(visibilitychangeHandler: () => void) {
  document.addEventListener('visibilitychange', visibilitychangeHandler);
  return () => document.removeEventListener('visibilitychange', visibilitychangeHandler);
}

function useDocumentVisibility() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    return subscribeToVisibilitychange(() => setVisible(!document.hidden));
  }, [setVisible]);

  useEffect(() => {
    if (!visible) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [visible]);

  const onVisibilityChange = useCallback((invoke: (visible: boolean) => void) => {
    return subscribeToVisibilitychange(() => invoke(!document.hidden));
  }, []);

  return { count, visible, onVisibilityChange };
}

export default useDocumentVisibility;
