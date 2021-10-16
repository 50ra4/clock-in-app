import React from 'react';
import styled, { css } from 'styled-components';

import { InHouseWork } from 'types';
import { ErrorMessageForForm } from 'presentation/components/forms/ErrorMessageForForm/ErrorMessageForForm';
import { InHouseWorkForm } from '../InHouseWorkForm/InHouseWorkForm';
import { AdditionalButton } from '../AdditionalButton/AdditionalButton';
import { LabelForForm } from 'presentation/components/forms/LabelForForm/LabelForForm';

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

  const handleOnClickAdd = () => {
    onChange([...values, { id: undefined }]);
  };

  return (
    <StyledRoot className={className}>
      {values.map((value, index) => {
        return (
          <StyledInHouseWorkForm
            type={type}
            key={`inHouseWork-${index + 1}`}
            id={`inHouseWork-${index + 1}`}
            name="inHouseWork"
            label={`社内作業${index + 1}`}
            inline={inline}
            readOnly={readOnly}
            disabled={disabled}
            row={index}
            value={value}
            onChange={handleOnChange}
            onClear={handleOnClickClear}
          />
        );
      })}
      {!readOnly && (
        <StyledWrapper showLabel={values.length === 0} inline={!!inline}>
          {values.length === 0 && <StyledLabel label="社内作業" />}
          <StyledAdditionalButton label="社内作業を追加" onClick={handleOnClickAdd} />
        </StyledWrapper>
      )}
      {error && <ErrorMessageForForm message={error} />}
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  width: 100%;
`;

const StyledInHouseWorkForm = styled(InHouseWorkForm)`
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
