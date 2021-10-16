import React from 'react';
import styled from 'styled-components';

import { RestTime } from 'types';
import { ErrorMessageForForm } from 'presentation/components/forms/ErrorMessageForForm/ErrorMessageForForm';
import { RestTimeForm } from '../RestTimeForm/RestTimeForm';
import { AdditionalButton } from '../AdditionalButton/AdditionalButton';

type OwnProps = {
  className?: string;
  type?: 'text' | 'input';
  label?: string;
  value?: RestTime[];
  readOnly?: boolean;
  disabled?: boolean;
  inline?: boolean;
  error?: string;
  alignTrashRight?: boolean;
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
  error,
  alignTrashRight,
  onChange,
}: RestTimeFormGroupProps) {
  const handleOnChange = (value: RestTime, rowIndex: number) => {
    onChange(values.map((v, i) => (rowIndex !== i ? v : { ...value })));
  };

  const handleOnClickClear = (rowIndex: number) => {
    onChange(values.filter((_, i) => rowIndex !== i));
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
            alignTrashRight={alignTrashRight}
            value={value}
            onChange={handleOnChange}
            onClear={handleOnClickClear}
          />
        );
      })}
      {inline ? (
        <StyledButtonWrapper>
          {/* TODO: add label if RestTimes is empty array */}
          <StyledAdditionalButton
            label="休憩時間を追加"
            onClick={() => {
              onChange([...values, { id: undefined }]);
            }}
          />
        </StyledButtonWrapper>
      ) : (
        <StyledAdditionalButton
          label="休憩時間を追加"
          onClick={() => {
            onChange([...values, { id: undefined }]);
          }}
        />
      )}
      {error && <ErrorMessageForForm message={error} />}
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  width: 100%;
`;

const StyledRestTimeForm = styled(RestTimeForm)`
  width: 100%;
  & + & {
    margin-top: ${({ theme }) => theme.space.large}px;
  }
`;

const StyledButtonWrapper = styled.div`
  /* for label */
  padding-left: 100px;
`;

const StyledAdditionalButton = styled(AdditionalButton)`
  width: 100%;
  margin-top: ${({ theme }) => theme.space.large}px;
`;
