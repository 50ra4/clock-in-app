import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { DescriptionForInput } from '../DescriptionForInput/DescriptionForInput';
import { ErrorMessageForInput } from '../ErrorMessageForInput/ErrorMessageForInput';
import { DateInputBase, DateInputBaseProps, DateSelect } from './DateInputBase';

export type DateInputProps = DateInputBaseProps;

export const UnStyledDateInput = React.memo(function DateInput({
  className,
  error,
  description,
  forceSelect = !isMobile,
  ...otherProps
}: DateInputProps) {
  if (forceSelect) {
    return <DateSelect {...otherProps} error={error} description={description} />;
  }

  return (
    <div className={className}>
      {/* fix: reRender */}
      {description && <DescriptionForInput description={description} />}
      <StyledDateInputBase {...otherProps} error={error} forceSelect={forceSelect} />
      {error && <ErrorMessageForInput message={error} />}
    </div>
  );
});

const StyledDateInputBase = styled(DateInputBase)``;
export const DateInput = styled(UnStyledDateInput)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > ${StyledDateInputBase} {
    width: 100%;
    position: relative;
    & > button {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
    }
  }
`;
