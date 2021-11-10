import React from 'react';
import styled from 'styled-components';
import { CloseIcon } from 'presentation/components/display/Icons/CloseIcon';
import { MenuIcon } from 'presentation/components/display/Icons/MenuIcon';
import { IconButton, IconButtonProps } from 'presentation/components/inputs/IconButton/IconButton';

export type HeaderProps = {
  className?: string;
  title: string | React.ReactNode;
  openMenu?: boolean;
  showMenuIcon?: boolean;
  onToggleMenu?: () => void;
};

const UnStyledHeader = React.memo(function Header({
  className,
  title,
  openMenu = false,
  showMenuIcon = true,
  onToggleMenu,
}: HeaderProps) {
  return (
    <header className={className}>
      {typeof title === 'string' ? <h2>{title}</h2> : title}
      {showMenuIcon && <RightActionButton open={openMenu} onClick={onToggleMenu} />}
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
      {open ? <CloseIcon color="main" /> : <MenuIcon color="main" />}
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
