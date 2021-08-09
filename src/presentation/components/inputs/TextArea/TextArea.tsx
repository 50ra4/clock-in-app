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
  error?: string;
  description?: string;
  placeholder?: string;
};

type InheritedProps = Omit<JSX.IntrinsicElements['textarea'], 'children' | keyof OwnProps>;

export type TextAreaProps = OwnProps & InheritedProps;

export const UnStyledTextArea = React.memo(function TextArea({
  ref,
  className,
  error,
  description,
  value = '',
  ...otherProps
}: TextAreaProps) {
  return (
    <div className={className}>
      {/* fix: reRender */}
      {/* {description && <DescriptionForInput description={description} />} */}
      <textarea {...otherProps} ref={ref} value={value} />
      {/* {error && <ErrorMessageForInput message={error} />} */}
    </div>
  );
});

export const TextArea = styled(UnStyledTextArea)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > textarea {
    resize: none;
    width: 100%;
    line-height: 24px;
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
  }
`;
