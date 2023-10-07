import React, { useEffect } from "react";

type DelayedComponentProps = {
  delay?: number;
  onDone: () => void;
};

export const DelayedComponent: React.FC<React.PropsWithChildren<DelayedComponentProps>> = ({
  delay = 1500,
  onDone,
  children,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), delay);

    return () => clearInterval(timer);
  }, [delay, onDone]);

  return <>{children}</>;
};
