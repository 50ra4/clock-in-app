import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};

type InheritedProps = Omit<JSX.IntrinsicElements['hr'], keyof OwnProps | 'children'>;

export type DividerProps = OwnProps & InheritedProps;

export const UnStyledDivider = React.memo(function Divider({ ...otherProps }: DividerProps) {
  return <hr {...otherProps} />;
});

export const Divider = styled(UnStyledDivider)`
  height: 1px;
  margin: ${({ theme }) => `${theme.space.middle}px 0`};
  background-color: ${({ theme }) => theme.color.border.light};
`;
