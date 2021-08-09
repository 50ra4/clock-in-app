import React from 'react';
import styled, { css } from 'styled-components';

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
      <label {...otherProps} htmlFor={htmlFor}>
        {label}
      </label>
      <div>{children}</div>
    </div>
  );
});

export const WithLabelForForm = styled(UnStyledWithLabelForForm)`
  width: 100%;
  & > label {
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
  }
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
            line-height: 28px;
            padding-top: ${({ theme }) => (!description ? 0 : `${theme.space.large}px`)};
          }
          & > div {
            flex-basis: auto;
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
