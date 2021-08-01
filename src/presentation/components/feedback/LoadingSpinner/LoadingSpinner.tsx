import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette, IconSize } from 'styles/theme';
import { SyncIcon } from 'presentation/components/display/Icons/SyncIcon';

type OwnProps = {
  iconSize?: IconSize;
  color?: ColorPalette;
  message?: string | React.ReactNode;
};

type InheritedProps = Omit<JSX.IntrinsicElements['div'], keyof OwnProps | 'children'>;

export type LoadingSpinnerProps = OwnProps & InheritedProps;

const LoadingSpinnerClass = 'LoadingSpinner';
export const LoadingSpinnerClassNames = {
  root: LoadingSpinnerClass,
  icon: {
    root: `${LoadingSpinnerClass}__icon`,
    messageOnly: `${LoadingSpinnerClass}__icon--message-only`,
  },
  message: {
    root: `${LoadingSpinnerClass}__message`,
    text: `${LoadingSpinnerClass}__message__text`,
  },
} as const;

export const UnStyledLoadingSpinner = React.memo(function LoadingSpinner({
  className,
  message,
  iconSize = 'large',
  color = 'default',
  ...otherProps
}: LoadingSpinnerProps) {
  return (
    <div {...otherProps} className={className}>
      <div className={message ? LoadingSpinnerClassNames.icon.root : LoadingSpinnerClassNames.icon.messageOnly}>
        <StyledSyncIcon size={iconSize} color={color} />
      </div>
      {message && (
        <div className={LoadingSpinnerClassNames.message.root}>
          {typeof message === 'string' ? <p className={LoadingSpinnerClassNames.message.text}>{message}</p> : message}
        </div>
      )}
    </div>
  );
});

const StyledSyncIcon = styled(SyncIcon)`
  animation: 2s linear infinite ${({ theme }) => theme.keyframes.rotation};
`;
export const LoadingSpinner = styled(UnStyledLoadingSpinner)`
  display: inline-block;
  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & > div + div {
    margin-top: ${({ theme }) => `${theme.space.middle}px`};
  }
  & > div.${LoadingSpinnerClassNames.icon.messageOnly} {
    ${({ theme, iconSize = 'large' }) => css`
      width: ${theme.icon.size[iconSize]}px;
      height: ${theme.icon.size[iconSize]}px;
    `}
  }
  & > div.${LoadingSpinnerClassNames.message.root} {
    & > p.${LoadingSpinnerClassNames.message.text} {
      text-align: center;
      font-size: ${({ theme }) => theme.font.size.small}px;
    }
  }
`;
