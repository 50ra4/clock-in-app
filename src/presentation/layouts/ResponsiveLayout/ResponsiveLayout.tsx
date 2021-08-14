import React from 'react';
import styled, { css } from 'styled-components';

type OwnProps = {
  className?: string;
  /** default is center */
  placement?: 'left' | 'center' | 'right';
  children: React.ReactNode;
};

export type ResponsiveLayoutProps = OwnProps;

const UnStyledResponsiveLayout = React.memo(function ResponsiveLayout({
  children,
  ...otherProps
}: ResponsiveLayoutProps) {
  return <div {...otherProps}>{children}</div>;
});

export const ResponsiveLayout = styled(UnStyledResponsiveLayout)`
  ${({ theme, placement = 'center' }) => css`
    max-width: ${theme.breakpoint.small}px;
    @media (min-width: ${theme.breakpoint.small}px) {
      margin: ${placement === 'center' ? '0 auto' : placement === 'right' ? '0 0 0 auto' : '0 auto 0 0'};
    }
  `}
`;
