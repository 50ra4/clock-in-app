import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Lookup } from 'types';
import { ArrowDropDownIcon } from 'presentation/components/display/Icons/ArrowDropDownIcon';

type OwnProps = {
  ref?: React.RefObject<HTMLSelectElement> | null;
  className?: string;
  id: string;
  name: string;
  value?: string;
  options?: Lookup[];
  required?: boolean;
  readOnly?: boolean;
  error?: string;
  description?: string;
  placeholder?: string;
};

type InheritedProps = Omit<JSX.IntrinsicElements['select'], 'children' | keyof OwnProps>;
export type SelectInputProps = OwnProps & InheritedProps;

export const UnStyledSelectInput = React.memo(function SelectInput({
  ref,
  className,
  error,
  description,
  options = [],
  placeholder = '選択する',
  value,
  ...otherProps
}: SelectInputProps) {
  const selectedId = options.find((option) => option.value === value)?.id;

  const optionElements = useMemo(() => {
    return options.map(({ id, value }) => (
      <option key={id} value={id}>
        {value}
      </option>
    ));
  }, [options]);

  return (
    <div className={className}>
      <select {...otherProps} value={selectedId}>
        <option key={''} value={undefined}>
          {selectedId ? '未選択にする' : placeholder}
        </option>
        <>{optionElements}</>
      </select>
      <StyledArrowDropDownIcon />
    </div>
  );
});

const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)``;

export const SelectInput = styled(UnStyledSelectInput)`
  width: 100%;
  position: relative;
  & > select {
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: ${({ theme }) => theme.font.size.middle}px;
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
    padding: ${({ theme }) => `0 38px 0 ${theme.space.large}px`};
    appearance: none;
    &:-ms-expand {
      display: none;
    }
  }
  & > ${StyledArrowDropDownIcon} {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }
`;
