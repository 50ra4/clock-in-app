import React from 'react';
import styled from 'styled-components';
import { LinkProps as OwnProps, Link as RouterLink } from 'react-router-dom';

export type LinkProps = OwnProps;

export function UnStyledLink({ children, ...otherProps }: LinkProps) {
  return <RouterLink {...otherProps}>{children}</RouterLink>;
}

export const Link = styled(UnStyledLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.font.link};
  &:visited {
    color: ${({ theme }) => theme.color.font.link};
  }
  &:hover,
  &:active {
    color: ${({ theme }) => theme.color.font.link};
    text-decoration: underline;
  }
`;
