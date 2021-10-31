import React from 'react';
import styled from 'styled-components';
import { CloseIcon } from 'presentation/components/display/Icons/CloseIcon';
import { MenuIcon } from 'presentation/components/display/Icons/MenuIcon';
import { IconButton, IconButtonProps } from 'presentation/components/inputs/IconButton/IconButton';

type OwnProps = {
  className?: string;
  title: string | React.ReactNode;
  openMenu?: boolean;
  onToggleMenu?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type InheritedProps = Omit<JSX.IntrinsicElements['header'], 'children' | keyof OwnProps>;

export type HeaderProps = OwnProps & InheritedProps;

const UnStyledHeader = React.memo(function Header({
  className,
  title,
  openMenu = false,
  onToggleMenu,
  ...otherProps
}: HeaderProps) {
  return (
    <header {...otherProps} className={className}>
      {typeof title === 'string' ? <h2>{title}</h2> : title}
      <RightActionButton open={openMenu} onClick={onToggleMenu} />
    </header>
  );
});

const RightActionButton = React.memo(function RightActionButton({
  ref,
  open,
  ...otherProps
}: IconButtonProps & { open: boolean }) {
  return (
    <IconButton {...otherProps} aria-label={open ? 'メニューを閉じる' : 'メニューを表示'}>
      {open ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  );
});

export const Header = styled(UnStyledHeader)`
  z-index: ${({ theme }) => theme.zIndex.appBar};
  height: ${({ theme }) => theme.height.header}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.large}px`};
  background-color: ${({ theme }) => theme.color.palette.primary.background};
  & > h2 {
    color: ${({ theme }) => theme.color.palette.primary.font};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.extraLarge}px;
    line-height: ${({ theme }) => theme.height.header}px;
    height: ${({ theme }) => theme.height.header}px;
  }
`;
