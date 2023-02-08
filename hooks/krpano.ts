import { useEffect } from "react";

declare global {
  interface Window {
    [functionName: string]: any;
  }
}

export const usePano = (
  functionName: string,
  callback: (params: any) => void
) => {
  useEffect(() => {
    window[functionName] = callback;
  }, [callback, functionName]);
};
