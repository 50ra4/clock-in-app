import React from 'react';
import styled from 'styled-components';
import { ColorPalette, IconSize } from 'presentation/styles/theme';
import { CheckboxOffIcon, CheckboxOnIcon } from 'presentation/components/display/Icons/CheckboxIcon';

type OwnProps = {
  className?: string;
  id: string;
  label: string;
  name?: string;
  value?: string;
  color?: ColorPalette;
  size?: IconSize;
};

type InheritedProps = Omit<JSX.IntrinsicElements['input'], 'children' | keyof OwnProps>;
export type CheckboxProps = OwnProps & InheritedProps;

const UnStyledCheckbox = React.memo(function Checkbox({
  className,
  id,
  label,
  name = label,
  value,
  checked = false,
  disabled = false,
  size = 'medium',
  color = 'default',
  onChange,
  ...otherProps
}: CheckboxProps) {
  return (
    <div className={className}>
      <input
        {...otherProps}
        type="checkbox"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
      <div>
        {checked ? <CheckboxOnIcon size={size} color={color} /> : <CheckboxOffIcon size={size} color={color} />}
      </div>
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
});

export const Checkbox = styled(UnStyledCheckbox)`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  & > div {
    display: inline-flex;
    align-items: center;
    transition: all 150ms;
    margin-right: 5px;
  }
  & > label {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    font-size: ${({ theme, size = 'medium' }) =>
      `${size === 'medium' ? theme.font.size.middle : theme.font.size[size]}px`};
    font-weight: ${({ theme, size }) => size === 'large' && theme.font.weight.bold};
  }
  & > input[type='checkbox'] {
    /**
    * Hide checkbox visually but remain accessible to screen readers.
    * @see https://polished.js.org/docs/#hidevisually
    */
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
  }
`;
