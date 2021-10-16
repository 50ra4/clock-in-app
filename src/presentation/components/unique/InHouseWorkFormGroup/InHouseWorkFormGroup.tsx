import React from 'react';
import styled from 'styled-components';

import { InHouseWork } from 'types';
import { ErrorMessageForForm } from 'presentation/components/forms/ErrorMessageForForm/ErrorMessageForForm';
import { InHouseWorkForm } from '../InHouseWorkForm/InHouseWorkForm';
import { AdditionalButton } from '../AddButton/AdditionalButton';
import { BackSpaceButton } from 'presentation/components/inputs/BackSpaceButton/BackSpaceButton';

type OwnProps = {
  className?: string;
  type?: 'text' | 'input';
  label?: string;
  value?: InHouseWork[];
  readOnly?: boolean;
  disabled?: boolean;
  inline?: boolean;
  error?: string;
  onChange: (values: InHouseWork[]) => void;
  onBlur?: (values: InHouseWork[]) => void;
};

export type InHouseWorkFormGroupProps = OwnProps;

// eslint-disable-next-line complexity
export const InHouseWorkFormGroup = React.memo(function InHouseWorkFormGroup({
  className,
  type,
  value: values = [],
  readOnly,
  disabled,
  inline,
  error,
  onChange,
}: InHouseWorkFormGroupProps) {
  const handleOnChange = (value: InHouseWork, rowIndex: number) => {
    onChange(values.map((v, i) => (rowIndex !== i ? v : { ...value })));
  };

  const handleOnClickClear = (rowIndex: number) => {
    onChange(values.filter((_, i) => rowIndex !== i));
  };

  return (
    <StyledRoot className={className}>
      {values.map((value, index) => {
        return (
          <StyledFormWrapper key={`inHouseWork-${index + 1}`}>
            <StyledBackSpaceButton
              ariaLabel={`社内作業${index + 1}を削除する`}
              onClick={() => handleOnClickClear(index)}
            />
            <InHouseWorkForm
              type={type}
              id={`inHouseWork-${index + 1}`}
              name="inHouseWork"
              label={`社内作業${index + 1}`}
              inline={inline}
              readOnly={readOnly}
              disabled={disabled}
              row={index}
              value={value}
              onChange={(v, row) => handleOnChange(v, row)}
            />
          </StyledFormWrapper>
        );
      })}
      <StyledAdditionalButton
        label="社内作業を追加"
        onClick={() => {
          onChange([...values, { id: undefined }]);
        }}
      />
      {error && <ErrorMessageForForm message={error} />}
    </StyledRoot>
  );
});

const StyledRoot = styled.div``;

const StyledBackSpaceButton = styled(BackSpaceButton)`
  /* FIXME: inline style */
  transform: rotate(180deg);
`;

const StyledFormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  & + & {
    margin-top: ${({ theme }) => theme.space.large}px;
  }
`;

const StyledAdditionalButton = styled(AdditionalButton)`
  width: 100%;
  margin-top: ${({ theme }) => theme.space.large}px;
`;
