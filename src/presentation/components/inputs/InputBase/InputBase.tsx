import React from 'react';
import styled, { css } from 'styled-components';

type StyledProps = {
  leftIcon?: boolean;
  rightIcon?: boolean;
};

type BaseProps = {
  ref?: React.RefObject<HTMLInputElement> | null;
  className?: string;
  type: string;
  id: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  readOnly?: boolean;
  error?: string;
  placeholder?: string;
};

type InheritedProps = Omit<JSX.IntrinsicElements['input'], 'children' | keyof BaseProps | keyof StyledProps>;

export type InputBaseProps = BaseProps & InheritedProps;

type Props = InputBaseProps & InheritedProps & StyledProps;

const InputBaseRootClassName = 'input-base';
export const InputBaseClassNames = {
  root: InputBaseRootClassName,
} as const;

const UnStyledInputBase = React.memo(function UnStyledInputBase({
  className = '',
  rightIcon,
  leftIcon,
  ...otherProps
}: Props) {
  return <input {...otherProps} className={[className, InputBaseClassNames.root].join(' ')} />;
});

export const InputBase = styled(UnStyledInputBase)`
  width: 100%;
  height: 38px;
  line-height: 38px;
  font-size: ${({ theme }) => theme.font.size.middle}px;
  ${({ theme }) => theme.font.ellipsis.single()};
  padding: ${({ theme, rightIcon, leftIcon }) =>
    `0 ${rightIcon ? '38px' : `${theme.space.large}px`} 0 ${leftIcon ? '38px' : `${theme.space.large}px`}`};
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
