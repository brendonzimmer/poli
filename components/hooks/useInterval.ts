import { useEffect, useRef } from "react";

export function useInterval(callback: Function, delay: number, dependents?: any[]) {
  const savedCallback = useRef<Function>();
  if (!dependents?.length) dependents = [];

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, ...dependents]);
}
