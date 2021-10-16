import React from 'react';
import styled, { css } from 'styled-components';

type OwnProps = {
  className?: string;
  htmlFor?: string;
  label: string;
  required?: boolean;
  inline?: boolean;
  description?: string;
};
type InheritedProps = Omit<JSX.IntrinsicElements['label'], keyof OwnProps>;

export type LabelForFormProps = OwnProps & InheritedProps;

export function LabelForForm({ className, ref, label, ...otherProps }: LabelForFormProps) {
  return (
    <StyledLabel className={className} {...otherProps}>
      {label}
    </StyledLabel>
  );
}

const StyledLabel = styled.label<Omit<OwnProps, 'label'>>`
  font-size: ${({ theme }) => theme.font.size.middle}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  ${({ required }) =>
    required &&
    css`
      &::after {
        content: '*';
        color: ${({ theme }) => theme.color.font.red};
      }
    `};
`;
