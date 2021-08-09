import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};

type InheritedProps = Omit<JSX.IntrinsicElements['header'], keyof OwnProps>;

export type HeaderProps = OwnProps & InheritedProps;

const UnStyledHeader = React.memo(function Header({ ...otherProps }: HeaderProps) {
  return (
    <header {...otherProps}>
      <h2>Clock In</h2>
    </header>
  );
});

export const headerHeight = 57;
export const Header = styled(UnStyledHeader)`
  height: ${headerHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.large}px`};
  background-color: ${({ theme }) => theme.color.palette.primary.background};
  & > h2 {
    color: ${({ theme }) => theme.color.palette.primary.font};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.extraLarge}px;
    line-height: 57px;
    height: 57px;
  }
`;
