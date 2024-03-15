import { useEffect, useState } from "react";

export const useTransition = (transitionStarter) => {
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    setTransitionComplete(false);
  }, [transitionStarter]);

  const endTransition = () => {
    setTransitionComplete(true);
  };
  return [transitionComplete, endTransition];
};
