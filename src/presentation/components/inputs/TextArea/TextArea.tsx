import React from 'react';
import styled, { css } from 'styled-components';

type OwnProps = {
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  className?: string;
  id: string;
  name: string;
  value: string | undefined;
  row?: number;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  placeholder?: string;
};

type InheritedProps = Omit<JSX.IntrinsicElements['textarea'], 'children' | keyof OwnProps>;

export type TextAreaProps = OwnProps & InheritedProps;

export const UnStyledTextArea = React.memo(function TextArea({
  ref,
  className,
  value = '',
  error,
  ...otherProps
}: TextAreaProps) {
  return <textarea {...otherProps} className={className} ref={ref} value={value} />;
});

export const TextArea = styled(UnStyledTextArea)`
  resize: none;
  width: 100%;
  height: ${({ row = 3 }) => row * 24}px;
  font-size: ${({ theme }) => theme.font.size.middle}px;
  padding: ${({ theme }) => `0 ${theme.space.large}px`};
  background-color: #ffffff;
  ${({ error }) =>
    error &&
    css`
      background-color: #ffeeff;
      outline: 2px solid ${({ theme }) => theme.color.font.red};
    `}
  &:focus {
    background-color: #ffffff;
    outline: 2px solid ${({ theme }) => theme.color.palette.secondary.background};
  }
  caret-color: ${({ theme }) => theme.color.palette.secondary.background};
`;
