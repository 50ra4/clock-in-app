import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { DescriptionForInput } from '../DescriptionForInput/DescriptionForInput';
import { ErrorMessageForInput } from '../ErrorMessageForInput/ErrorMessageForInput';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';
import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { VisibilityIcon } from 'presentation/components/display/Icons/VisibilityIcon';
import { VisibilityOffIcon } from 'presentation/components/display/Icons/VisibilityOffIcon';

type OwnProps = {
  description?: string;
};

export type PasswordInputProps = OwnProps & Omit<InputBaseProps, 'type' | keyof OwnProps>;

export type InputClearButtonProps = Omit<IconButtonProps, 'children'>;

// eslint-disable-next-line complexity
export const UnStyledPasswordInput = React.memo(function PasswordInput({
  ref,
  className,
  error,
  description,
  value = '',
  ...otherProps
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <div className={className}>
      {/* fix: reRender */}
      {description && <DescriptionForInput description={description} />}
      <div>
        <InputBase {...otherProps} type={visible ? 'text' : 'password'} rightIcon={true} error={error} value={value} />
        <StyledVisibilityButton visible={visible} onClick={toggleVisible} />
      </div>
      {error && <ErrorMessageForInput message={error} />}
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > div {
    width: 100%;
    position: relative;
    & > ${StyledVisibilityButton} {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
    }
  }
`;
