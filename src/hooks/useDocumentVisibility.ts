import { useState, useEffect, useCallback } from 'react';

function useDocumentVisibility() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [listenersState, setListiners] = useState<Set<() => void>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visibilitychangeHandler = () => setVisible(!document.hidden);

    document.addEventListener('visibilitychange', visibilitychangeHandler);
    return () => document.removeEventListener('visibilitychange', visibilitychangeHandler);
  }, [setVisible]);

  useEffect(() => {
    if (!visible) {
      setCount((prevCount) => prevCount + 1);
    }
    listenersState.forEach((listener) => {
      listener();
    });
  }, [visible, listenersState]);

  const onVisibilityChange = useCallback(
    (invoke: (visible: boolean) => void) => {
      const visibilitychangeHandler = () => invoke(visible);

      setListiners((listeners) => {
        listeners.add(visibilitychangeHandler);
        return listeners;
      });

      return () => {
        setListiners((listeners) => {
          listeners.delete(visibilitychangeHandler);
          return listeners;
        });
      };
    },
    [visible, setListiners],
  );

  return { count, visible, onVisibilityChange };
}

export default useDocumentVisibility;
