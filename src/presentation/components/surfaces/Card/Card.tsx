import React from 'react';
import styled from 'styled-components';

import { Divider } from 'presentation/components/display/Divider/Divider';

type OwnProps = {
  title: string | React.ReactNode;
};

type InheritedProps = Omit<JSX.IntrinsicElements['section'], keyof OwnProps>;

export type CardProps = OwnProps & InheritedProps;

export const UnStyledCard = React.memo(function Card({ title, children, ...otherProps }: CardProps) {
  return (
    <section {...otherProps}>
      <h3>{title}</h3>
      <Divider />
      <div>{children}</div>
    </section>
  );
});

export const Card = styled(UnStyledCard)`
  margin: ${({ theme }) => `${theme.space.small}px ${theme.space.middle}px ${theme.space.middle}px`};
  padding: ${({ theme }) => `${theme.space.small}px`};
  background-color: ${({ theme }) => theme.color.palette.default.background};
  & > h3 {
    line-height: 32px;
    height: 32px;
    vertical-align: middle;
    color: ${({ theme }) => theme.color.palette.default.font};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.large}px;
    margin: ${({ theme }) => `${theme.space.middle}px`};
  }
  & > div {
    padding: ${({ theme }) => `${theme.space.small}px ${theme.space.middle}px ${theme.space.middle}px`};
  }
`;
