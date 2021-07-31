import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};

type InheritedProps = Omit<JSX.IntrinsicElements['section'], keyof OwnProps>;

export type PaperProps = OwnProps & InheritedProps;

const UnStyledPaper = React.memo(function Paper({ title, children, ...otherProps }: PaperProps) {
  return (
    <section {...otherProps}>
      <div>{children}</div>
    </section>
  );
});

export const Paper = styled(UnStyledPaper)`
  margin: ${({ theme }) => `${theme.space.small}px ${theme.space.middle}px ${theme.space.middle}px`};
  padding: ${({ theme }) => `${theme.space.small}px`};
  background-color: ${({ theme }) => theme.color.palette.default.background};
  & > div {
    padding: ${({ theme }) => `${theme.space.large}px`};
  }
`;
