import React from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { ChipStyle, chipStyle } from 'presentation/components/display/Chip/Chip';

export type ChipSelectorProps<T> = Omit<ChipStyle, 'variant'> & {
  className?: string;
  type: 'checkbox' | 'radio';
  id: string;
  name: string;
  label: string;
  value: T;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean, value: T) => void;
};

export const ChipSelector = React.memo(function ChipSelector<T>({
  className,
  type,
  id,
  name,
  label,
  value,
  checked,
  disabled,
  color,
  onChange,
}: ChipSelectorProps<T>): JSX.Element {
  const handleOnChange = () => {
    if (disabled) return;
    onChange(checked, value);
  };

  return (
    <ChipWrapper className={className} disabled={disabled} color={color} variant={checked ? 'default' : 'outline'}>
      <label htmlFor={id}>
        <input type={type} id={id} name={name} checked={checked} onChange={handleOnChange} />
        {label}
      </label>
    </ChipWrapper>
  );
}) as <T>(props: T) => JSX.Element;

export type StyleChipSelector<T> = StyledComponent<
  (props: T) => JSX.Element,
  DefaultTheme,
  Record<string, never>,
  never
>;

const ChipWrapper = styled.div<ChipStyle>`
  ${({ disabled, color, variant }) => chipStyle({ disabled, color, variant })}

  & > label {
    display: inline-block;
    cursor: ${({ disabled = false }) => (!disabled ? 'pointer' : 'default')};
    padding: ${({ theme }) => `${theme.space.large}px ${theme.space.large * 2}px`};

    & > input {
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
  }
`;

export const ChipSelectorGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;

  margin-bottom: ${({ theme }) => `${-theme.space.large}px`};
  margin-right: ${({ theme }) => `${-theme.space.large}px`};

  & > ${ChipWrapper} {
    margin-bottom: ${({ theme }) => `${theme.space.large}px`};
    margin-right: ${({ theme }) => `${theme.space.large}px`};
  }
`;
