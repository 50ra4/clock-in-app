import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { InHouseWork, Time, Range } from 'types';
import { FormBaseProps } from 'presentation/components/forms/FormBase/FormBase';
import { DescriptionForForm } from 'presentation/components/forms/DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from 'presentation/components/forms/ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from 'presentation/components/forms/WithLabelForForm/WithLabelForForm';
import { TimeTextInput } from 'presentation/components/inputs/TimeTextInput/TimeTextInput';
import { TimeInput } from 'presentation/components/inputs/TimeInput/TimeInput';
import { Button } from 'presentation/components/inputs/Button/Button';
import { AddCircleIcon } from 'presentation/components/display/Icons/AddCircleIcon';
import { TextInput } from 'presentation/components/inputs/TextInput/TextInput';

type OwnProps = {
  type?: 'text' | 'input';
  onChange: (values: InHouseWork[]) => void;
  onBlur?: (values: InHouseWork[]) => void;
};

export type InHouseWorksFormProps = OwnProps & Omit<FormBaseProps<InHouseWork[]>, keyof OwnProps>;

const rootClassName = 'in-house-works-form';
export const InHouseWorksFormClassNames = {
  root: rootClassName,
  wrap: `${rootClassName}__wrap`,
} as const;

// eslint-disable-next-line complexity
export const UnStyledInHouseWorksForm = React.memo(function InHouseWorksForm({
  className,
  type = isMobile ? 'input' : 'text',
  id,
  name,
  value: values = [],
  placeholder,
  readOnly,
  label,
  required,
  inline,
  error,
  description,
  onChange,
}: InHouseWorksFormProps) {
  const handleOnChangeTime = (time: Time, rowIndex: number, key: keyof Range<Time>) => {
    onChange(values.map((v, i) => (rowIndex !== i ? v : { ...v, [key]: time })));
  };

  const handleOnRemarks = (remarks: string, rowIndex: number) => {
    onChange(values.map((v, i) => (rowIndex !== i ? v : { ...v, remarks })));
  };

  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        {values.map(({ start, end, remarks }, rowIndex) => {
          return (
            <React.Fragment key={`${id}-${rowIndex}`}>
              <div className={InHouseWorksFormClassNames.wrap}>
                {type === 'text' ? (
                  <StyledTimeTextInput
                    id={id}
                    name={name}
                    value={start}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    error={error}
                    onBlur={(time) => {
                      handleOnChangeTime(time, rowIndex, 'start');
                    }}
                  />
                ) : (
                  <StyledTimeInput
                    id={id}
                    name={name}
                    value={start}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    error={error}
                    onChange={(time) => {
                      handleOnChangeTime(time, rowIndex, 'start');
                    }}
                  />
                )}
                <span>~</span>
                {type === 'text' ? (
                  <StyledTimeTextInput
                    id={`${id}-end`}
                    name={`${name}-end`}
                    value={end}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    error={error}
                    onBlur={(time) => {
                      handleOnChangeTime(time, rowIndex, 'end');
                    }}
                  />
                ) : (
                  <StyledTimeInput
                    id={`${id}-end`}
                    name={`${name}-end`}
                    value={end}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    error={error}
                    onChange={(time) => {
                      handleOnChangeTime(time, rowIndex, 'end');
                    }}
                  />
                )}
              </div>
              <StyledTextInput
                id={`${id}-remarks-${rowIndex}`}
                name={`${name}-remarks`}
                value={remarks}
                error={error}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={(e) => {
                  handleOnRemarks(e.currentTarget?.value ?? '', rowIndex);
                }}
                onClear={(e) => {
                  handleOnRemarks('', rowIndex);
                }}
              />
            </React.Fragment>
          );
        })}
        <StyledButton
          onClick={() => {
            onChange([...values, { start: undefined, end: undefined }]);
          }}
        >
          <div>
            <AddCircleIcon color="main" />
            {label}を追加
          </div>
        </StyledButton>
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

const StyledTimeTextInput = styled(TimeTextInput)``;
const StyledTimeInput = styled(TimeInput)``;
const StyledTextInput = styled(TextInput)``;
const StyledButton = styled(Button)``;
export const InHouseWorksForm = styled(UnStyledInHouseWorksForm)`
  div.${InHouseWorksFormClassNames.wrap} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > ${StyledTimeTextInput} {
      width: 82px;
    }
    & > ${StyledTimeInput} {
      /* FIXME adjust size */
      width: 100px;
    }
    & > span {
      max-width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: ${({ theme }) => theme.font.size.large}px;
      font-weight: ${({ theme }) => theme.font.weight.bold};
    }
  }
  ${StyledTextInput} {
    max-width: 175px;
    margin: ${({ theme }) => `${theme.space.large}px 0`};
  }
  ${StyledButton} {
    min-width: 160px;
    & > div {
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      & > svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
