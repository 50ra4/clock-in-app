import React from 'react';
import styled, { css } from 'styled-components';
import { LabelForForm } from '../LabelForForm/LabelForForm';

type OwnProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  inline?: boolean;
  description?: string;
  children?: React.ReactNode;
};
type InheritedProps = Omit<JSX.IntrinsicElements['label'], keyof OwnProps>;

export type WithLabelForFormProps = OwnProps & InheritedProps;

export const UnStyledWithLabelForForm = React.memo(function WithLabelForForm({
  ref,
  className,
  htmlFor,
  label,
  inline,
  children = null,
  ...otherProps
}: WithLabelForFormProps) {
  return (
    <div className={className}>
      <LabelForForm {...otherProps} htmlFor={htmlFor} label={label} inline={inline} />
      <div>{children}</div>
    </div>
  );
});

export const WithLabelForForm = styled(UnStyledWithLabelForForm)`
  width: 100%;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  ${({ inline, description }) =>
    inline
      ? css`
          display: flex;
          & > label {
            flex-basis: 100px;
            line-height: ${({ theme }) => theme.height.input}px;
            padding-top: ${({ theme }) => (!description ? 0 : `${theme.space.large}px`)};
          }
          & > div {
            flex-basis: auto;
            flex-grow: 1;
          }
        `
      : css`
          & > label {
            display: block;
            width: 100%;
            margin-bottom: ${({ theme }) => theme.space.middle}px;
          }
        `}
`;
