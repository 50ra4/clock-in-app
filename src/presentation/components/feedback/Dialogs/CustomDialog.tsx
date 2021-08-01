import React from 'react';
import styled from 'styled-components';
import { Backdrop } from '../Backdrop/Backdrop';

type OwnProps = {
  id: string;
  className?: string;
  open?: boolean;
  onClose?: (event: React.MouseEvent<any, MouseEvent>) => void;
  title?: string;
  children?: string | React.ReactNode;
  actions?: React.ReactNode;
};

export type CustomDialogProps = OwnProps;

const CustomDialogClass = 'custom-dialog';
export const CustomDialogClassNames = {
  root: CustomDialogClass,
  title: `${CustomDialogClass}__title`,
  contents: `${CustomDialogClass}__contents`,
  actions: `${CustomDialogClass}__actions`,
} as const;

// FIXME:
// eslint-disable-next-line complexity
export const UnStyledCustomDialog = React.memo(function CustomDialog({
  id,
  className = '',
  open,
  onClose,
  title,
  children = null,
  actions = null,
  ...otherProps
}: CustomDialogProps) {
  const rootId = `dialog-${id}`;

  return (
    <Backdrop open={open} onClick={onClose}>
      <div
        {...otherProps}
        className={[className, CustomDialogClassNames.root].join(' ')}
        role="dialog"
        id={rootId}
        aria-labelledby={title ? `${rootId}__label` : undefined}
        aria-describedby={typeof children === 'string' ? `${rootId}__described` : undefined}
        aria-modal="true"
      >
        {title && (
          <h2 className={CustomDialogClassNames.title} id={`${rootId}__label`}>
            {title}
          </h2>
        )}
        <div
          className={CustomDialogClassNames.contents}
          id={typeof children === 'string' ? `${rootId}__described` : undefined}
        >
          {children}
        </div>
        {actions && <div className={CustomDialogClassNames.actions}>{actions}</div>}
      </div>
    </Backdrop>
  );
});

export const CustomDialog = styled(UnStyledCustomDialog)`
  width: 90%;
  color: ${({ theme }) => theme.color.palette.main.font};
  background-color: ${({ theme }) => theme.color.palette.main.background};
  display: inline-block;
  flex-direction: column;
  justify-content: space-between;
  & > h2.${CustomDialogClassNames.title} {
    color: ${({ theme }) => theme.color.palette.primary.font};
    background-color: ${({ theme }) => theme.color.palette.primary.background};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.large}px;
    line-height: 38px;
    height: 38px;
    padding-left: ${({ theme }) => theme.space.large}px;
  }
  & > .${CustomDialogClassNames.contents}, & > .${CustomDialogClassNames.actions} {
    padding: ${({ theme }) => theme.space.large}px;
  }
`;
