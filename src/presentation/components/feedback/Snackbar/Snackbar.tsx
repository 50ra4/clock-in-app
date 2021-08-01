import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { SnackbarSeverity } from 'styles/theme';
import { EnumValue } from 'types';

type OwnProps = {
  className?: string;
  open?: boolean;
  content: string | React.ReactNode;
  severity?: SnackbarSeverity;
  duration?: number;
  onClose?: () => void;
};

export type SnackbarProps = OwnProps;

const SnackbarClass = 'Snackbar';
export const SnackbarClassNames = {
  root: SnackbarClass,
  open: `${SnackbarClass}--open`,
  dismiss: `${SnackbarClass}--dismiss`,
  content: {
    root: `${SnackbarClass}__content`,
    icon: `${SnackbarClass}__content__icon`,
    text: `${SnackbarClass}__content__text`,
  },
} as const;

const SNACKBAR_STATUS = {
  initial: 'INITIAL',
  fadeIn: 'FADE_IN',
  remaining: 'REMAINING',
  fadeOut: 'FADE_OUT',
} as const;
type SnackbarStatus = EnumValue<typeof SNACKBAR_STATUS>;

const getRootClass = (status: SnackbarStatus): string => {
  const isOpen = status === SNACKBAR_STATUS.fadeIn || status === SNACKBAR_STATUS.remaining;
  return isOpen
    ? SnackbarClassNames.open
    : status === SNACKBAR_STATUS.fadeOut
    ? SnackbarClassNames.dismiss
    : SnackbarClassNames.root;
};

const UnStyledSnackbar = React.memo(function Snackbar({
  className = '',
  open = false,
  content,
  severity,
  duration = 5000,
  onClose,
  ...otherProps
}: SnackbarProps) {
  const [status, setStatus] = useState<SnackbarStatus>(SNACKBAR_STATUS.initial);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    setStatus(SNACKBAR_STATUS.fadeIn);
  }, [open]);

  useEffect(() => {
    if (status !== SNACKBAR_STATUS.fadeIn) {
      return;
    }
    setStatus(SNACKBAR_STATUS.remaining);
    timerRef.current = setTimeout(() => {
      setStatus(SNACKBAR_STATUS.fadeOut);
      timerRef.current = null;
    }, duration);
  }, [duration, onClose, status]);

  const onAnimationEnd = useCallback(() => {
    if (status !== SNACKBAR_STATUS.fadeOut) {
      return;
    }
    if (onClose) {
      setStatus(SNACKBAR_STATUS.initial);
      onClose();
    }
  }, [onClose, status]);

  const rootClass = getRootClass(status);

  return (
    <div {...otherProps} className={[className, rootClass].join(' ')} onAnimationEnd={onAnimationEnd}>
      <div className={SnackbarClassNames.content.root}>
        {typeof content === 'string' ? <p className={SnackbarClassNames.content.text}>{content}</p> : content}
      </div>
    </div>
  );
});

const fadeIn = keyframes`
  from { 
    opacity: 0;
    bottom: 0;
  }
  to {
    opacity: 1; 
    bottom: 30px;
  }
`;

const fadeOut = keyframes`
  from { 
    opacity: 1;
    bottom: 30px;
  }
  to {
    opacity: 0;
    bottom: 0; 
  }
`;

/**
 * @see https://www.w3schools.com/howto/howto_js_snackbar.asp
 */
export const Snackbar = styled(UnStyledSnackbar)`
  visibility: hidden; /* Hidden by default. Visible on click */
  position: fixed; /* Sit on top of the screen */
  left: 50%; /* Center the snackbar */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  display: inline-block;
  ${({ theme }) => theme.insetSafeArea.bottom('margin-bottom', '0px', '+')}
  &.${SnackbarClassNames.open} {
    animation: ${fadeIn} 0.5s linear;
  }
  &.${SnackbarClassNames.dismiss} {
    animation: ${fadeOut} 0.5s linear;
  }
  &.${SnackbarClassNames.open}, &.${SnackbarClassNames.dismiss} {
    visibility: visible; /* Show the snackbar */
    z-index: ${({ theme }) => theme.zIndex.snackbar}; /* Add a z-index if needed */
  }
  & > .${SnackbarClassNames.content.root} {
    ${({ theme, severity = 'info' }) => css`
      background-color: ${theme.color.snackbar[severity].background};
      color: ${theme.color.snackbar[severity].font};
      padding: ${theme.space.large}px;
      border-radius: 5px;
    `}
    & > .${SnackbarClassNames.content.text} {
      font-size: ${({ theme }) => theme.font.size.middle}px;
    }
  }
`;
