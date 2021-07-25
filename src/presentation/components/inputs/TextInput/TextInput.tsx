import React from 'react';
import styled from 'styled-components';

type OwnProps = {
  type?: 'email' | 'tel' | 'text' | 'url';
};
type InheritedProps = Omit<JSX.IntrinsicElements['input'], keyof OwnProps>;

export type TextInputProps = OwnProps & InheritedProps;

export const UnStyledTextInput = React.memo(function TextInput({
  type = 'text',
  children,
  ...otherProps
}: TextInputProps) {
  return <input type={type} {...otherProps} />;
});

export const TextInput = styled(UnStyledTextInput)``;
