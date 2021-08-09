import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';
import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { VisibilityIcon } from 'presentation/components/display/Icons/VisibilityIcon';
import { VisibilityOffIcon } from 'presentation/components/display/Icons/VisibilityOffIcon';

export type PasswordInputProps = Omit<InputBaseProps, 'type'>;

export const UnStyledPasswordInput = React.memo(function PasswordInput({
  ref,
  className,
  error,
  value = '',
  ...otherProps
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <div className={className}>
      <InputBase {...otherProps} type={visible ? 'text' : 'password'} rightIcon={true} error={error} value={value} />
      <StyledVisibilityButton visible={visible} onClick={toggleVisible} />
    </div>
  );
});

const VisibilityButton = React.memo(function VisibilityButton({
  ref,
  visible,
  ...otherProps
}: IconButtonProps & { visible: boolean }) {
  return (
    <IconButton {...otherProps} aria-label={visible ? 'パスワードを非表示' : 'パスワードを表示'}>
      {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  );
});
const StyledVisibilityButton = styled(VisibilityButton)``;
export const PasswordInput = styled(UnStyledPasswordInput)`
  width: 100%;
  position: relative;
  & > ${StyledVisibilityButton} {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }
`;