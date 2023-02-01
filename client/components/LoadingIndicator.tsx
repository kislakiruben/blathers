import { useEffect, useRef, useState } from "react";

import { SHOW_LOADING_INDICATOR_DELAY_TIMER } from "../constants";

/*
 * We don't show the loading indicator right away, because if we get the response back very fast, then the screen will
 * just flicker. We want for SHOW_LOADING_INDICATOR_DELAY_TIMER milliseconds before we actually show it.
 */
const LoadingIndicator = () => {
  const delayTimerRef = useRef<null | NodeJS.Timeout>(null);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    delayTimerRef.current = setTimeout(() => {
      setShowIndicator(true);
    }, SHOW_LOADING_INDICATOR_DELAY_TIMER);

    return () => {
      clearTimeout(delayTimerRef.current as NodeJS.Timeout);
    };
  }, []);

  return showIndicator ? (
    <div className="grow flex items-center justify-center">
      <div className="bg-slate-900/10 border border-pink-500/70 rounded-[5px] shadow-[0_0_10px_0_rgba(236,72,153,0.5)] p-[2px] ">
        <div className="animate-gradient border border-pink-500/50 bg-gradient-to-r from-slate-500 via-pink-500 to-sky-500 bg-[length:200%_100%] rounded-[2px] w-48 h-2"></div>
      </div>
    </div>
  ) : null;
};

export default LoadingIndicator;
