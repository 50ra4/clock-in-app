import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};
type InheritedProps = Omit<JSX.IntrinsicElements['input'], keyof OwnProps | 'type'>;

export type PasswordInputProps = OwnProps & InheritedProps;

export const UnStyledPasswordInput = React.memo(function PasswordInput({
  children,
  ...otherProps
}: PasswordInputProps) {
  return <input {...otherProps} />;
});

export const PasswordInput = styled(UnStyledPasswordInput)``;
