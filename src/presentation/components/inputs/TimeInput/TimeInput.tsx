import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { DescriptionForInput } from '../DescriptionForInput/DescriptionForInput';
import { ErrorMessageForInput } from '../ErrorMessageForInput/ErrorMessageForInput';
import { TimeInputBase, TimeInputBaseProps } from './TimeInputBase';

type OwnProps = {
  description?: string;
};

export type TimeInputProps = OwnProps & Omit<TimeInputBaseProps, keyof OwnProps>;

export const UnStyledTimeInput = React.memo(function TimeInput({
  ref,
  className,
  error,
  description,
  forceText = !isMobile,
  ...otherProps
}: TimeInputProps) {
  return (
    <div className={className}>
      {/* fix: reRender */}
      {description && <DescriptionForInput description={description} />}
      <StyledTimeInputBase {...otherProps} error={error} forceText={forceText} />
      {error && <ErrorMessageForInput message={error} />}
    </div>
  );
});

const StyledTimeInputBase = styled(TimeInputBase)``;
export const TimeInput = styled(UnStyledTimeInput)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > ${StyledTimeInputBase} {
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
