import React from 'react';
import styled, { css } from 'styled-components';

import { RestTime } from 'types';
import { RestTimeForm } from '../RestTimeForm/RestTimeForm';
import { AdditionalButton } from '../AdditionalButton/AdditionalButton';
import { LabelForForm } from 'presentation/components/forms/LabelForForm/LabelForForm';

type OwnProps = {
  className?: string;
  type?: 'text' | 'input';
  label?: string;
  value?: RestTime[];
  readOnly?: boolean;
  disabled?: boolean;
  inline?: boolean;
  errors?: string[];
  extendInput?: boolean;
  sortable?: boolean;
  max?: number;
  onChange: (values: RestTime[]) => void;
  onBlur?: (values: RestTime[]) => void;
};

export type RestTimeFormGroupProps = OwnProps;

// eslint-disable-next-line complexity
export const RestTimeFormGroup = React.memo(function RestTimeFormGroup({
  className,
  type,
  value: values = [],
  readOnly,
  disabled,
  inline,
  errors,
  extendInput,
  sortable,
  max,
  onChange,
}: RestTimeFormGroupProps) {
  const handleOnChange = (value: RestTime, rowIndex: number) => {
    onChange(values.map((v, i) => (rowIndex !== i ? v : { ...value })));
  };

  const handleOnClickClear = (rowIndex: number) => {
    onChange(values.filter((_, i) => rowIndex !== i));
  };

  const handleOnClickAdd = () => {
    onChange([...values, { id: undefined }]);
  };

  const handleOnSortUp = (row: number) => {
    const previous = values.find((_, i) => i === row - 1);
    const current = values.find((_, i) => i === row);
    if (!previous || !current) return;
    const before = values.slice(0, row - 1);
    const after = values.slice(row + 1);
    onChange([...before, current, previous, ...after]);
  };

  return (
    <StyledRoot className={className}>
      {values.map((value, index) => {
        return (
          <StyledRestTimeForm
            key={`restTime-${index + 1}`}
            type={type}
            id={`restTime-${index + 1}`}
            name="restTime"
            label={`休憩時間${index + 1}`}
            inline={inline}
            readOnly={readOnly}
            disabled={disabled}
            row={index}
            extendInput={extendInput}
            value={value}
            error={errors?.[index]}
            onChange={handleOnChange}
            onClear={handleOnClickClear}
            onSortUp={sortable ? handleOnSortUp : undefined}
          />
        );
      })}
      {!readOnly && (
        <StyledWrapper showLabel={values.length === 0} inline={!!inline}>
          {values.length === 0 && <StyledLabel label="休憩時間" />}
          {(!max || values.length < max) && (
            <StyledAdditionalButton disabled={disabled} label="休憩時間を追加" onClick={handleOnClickAdd} />
          )}
        </StyledWrapper>
      )}
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  width: 100%;
`;

const StyledRestTimeForm = styled(RestTimeForm)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.large}px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledLabel = styled(LabelForForm)`
  display: block;
  width: 100px;
  flex-shrink: 0;
`;

const StyledWrapper = styled.div<{ inline: boolean; showLabel: boolean }>`
  ${({ inline, showLabel }) =>
    !inline
      ? css``
      : showLabel
      ? css`
          display: flex;
          align-items: center;
        `
      : css`
          /* for label width */
          padding-left: 100px;
        `}
`;

const StyledAdditionalButton = styled(AdditionalButton)`
  width: 100%;
`;
