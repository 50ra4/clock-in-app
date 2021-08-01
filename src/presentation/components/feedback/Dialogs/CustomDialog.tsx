import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Backdrop } from '../Backdrop/Backdrop';
import { CloseIcon } from 'presentation/components/display/Icons/CloseIcon';
import { StopPropagation } from 'presentation/components/utils/StopPropagation/StopPropagation';

type OwnProps = {
  id: string;
  className?: string;
  open?: boolean;
  onClose?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  title?: string;
  children?: string | React.ReactNode;
  actions?: React.ReactNode;
};

export type CustomDialogProps = OwnProps;

const CustomDialogClass = 'custom-dialog';
export const CustomDialogClassNames = {
  root: CustomDialogClass,
  closeButton: `${CustomDialogClass}__close-button`,
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

  const handleClose = useCallback(
    (e: React.MouseEvent<unknown, MouseEvent>) => {
      e.stopPropagation();
      if (onClose) {
        onClose(e);
      }
    },
    [onClose],
  );

  return (
    <Backdrop open={open} onClick={handleClose}>
      <div
        {...otherProps}
        className={[className, CustomDialogClassNames.root].join(' ')}
        role="dialog"
        id={rootId}
        aria-labelledby={title ? `${rootId}__label` : undefined}
        aria-describedby={typeof children === 'string' ? `${rootId}__described` : undefined}
        aria-modal="true"
      >
        <StyledStopPropagation stopPropagation={true}>
          <button className={CustomDialogClassNames.closeButton} onClick={handleClose}>
            <CloseIcon color="negative" size="large" />
          </button>
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
        </StyledStopPropagation>
      </div>
    </Backdrop>
  );
});

const StyledStopPropagation = styled(StopPropagation)``;
export const CustomDialog = styled(UnStyledCustomDialog)`
  width: 90%;
  color: ${({ theme }) => theme.color.palette.main.font};
  background-color: ${({ theme }) => theme.color.palette.main.background};
  z-index: ${({ theme }) => theme.zIndex.modal};
  & > ${StyledStopPropagation} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    & > .${CustomDialogClassNames.closeButton} {
      position: absolute;
      top: 0;
      right: 0;
      z-index: ${({ theme }) => theme.zIndex.modal + 1};
      background-color: transparent;
      height: ${({ theme }) => theme.icon.size.large}px;
      width: ${({ theme }) => theme.icon.size.large}px;
    }
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
    & > .${CustomDialogClassNames.actions} {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      & > button + button {
        margin-left: ${({ theme }) => theme.space.large}px;
      }
    }
  }
`;
