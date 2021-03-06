import React from 'react';

type OwnProps = {
  className?: string;
  stopPropagation?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
};

export type StopPropagationProps = OwnProps;

export function StopPropagation({ children, onClick, stopPropagation = false, ...otherProps }: StopPropagationProps) {
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div {...otherProps} role="none" onClick={handleStopPropagation}>
      {children}
    </div>
  );
}
