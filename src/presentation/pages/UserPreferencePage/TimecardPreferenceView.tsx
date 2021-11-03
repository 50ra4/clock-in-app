import React from 'react';
import styled from 'styled-components';
import { TimecardUserPreference } from 'types';

import { useTimecardPreferenceForm } from './useTimecardPreferenceForm';

import { Button } from 'presentation/components/inputs/Button/Button';
import { TimeRangeForm } from 'presentation/components/forms/TimeRangeForm/TimeRangeForm';
import { MinuteForm } from 'presentation/components/forms/MinuteForm/MinuteForm';
import { RestTimeFormGroup } from 'presentation/components/unique/RestTimeFormGroup/RestTimeFormGroup';
import { DayOfWeekCheckForm } from 'presentation/components/unique/DayOfWeekCheckForm/DayOfWeekCheckForm';

type Props = {
  className?: string;
  readOnly: boolean;
  preference: TimecardUserPreference;
  onSave: (preference: TimecardUserPreference) => void;
};

export const TimecardPreferenceView = React.memo(function TimecardPreferenceView({
  className,
  readOnly,
  preference,
  onSave,
}: Props) {
  const { formState, formErrors, hasFormError, onChangeFormState } = useTimecardPreferenceForm({ ...preference });

  return (
    <StyledRoot className={className}>
      <h2>タイムカード設定</h2>
      <div>
        <TimeRangeForm
          id="working-hours"
          name="working-hours"
          label="定時"
          type="input"
          value={formState.workingTimes}
          readOnly={readOnly}
          disabled={readOnly}
          error={formErrors.workingTimes}
          onChange={(v) => {
            onChangeFormState('workingTimes', v);
          }}
        />
        <DayOfWeekCheckForm
          id="regular-holidays"
          name="regular-holidays"
          values={formState.regularHolidays}
          label="休日"
          error={undefined} // FIXME: ...
          onChange={(value) => {
            onChangeFormState('regularHolidays', value);
          }}
        />
        <RestTimeFormGroup
          type="input"
          value={formState.restTimes}
          readOnly={readOnly}
          disabled={readOnly}
          errors={formErrors.restTimes}
          sortable={true}
          max={5}
          onChange={(value) => {
            onChangeFormState('restTimes', value);
          }}
          onClickAdd={(prev) => {
            onChangeFormState('restTimes', [...prev, { id: undefined }]);
          }}
        />
        <MinuteForm
          id="round-down-minutes"
          name="round-down-minutes"
          label="丸め処理(分)"
          min={0}
          max={60}
          readOnly={readOnly}
          disabled={readOnly}
          value={formState.roundDownMinute}
          error={formErrors.roundDownMinute}
          onChange={(v) => {
            onChangeFormState('roundDownMinute', v);
          }}
          onClear={() => {
            onChangeFormState('roundDownMinute', 0);
          }}
        />
      </div>
      {!readOnly && (
        <SaveButton color="primary" text="更新する" disabled={hasFormError} onClick={() => onSave(formState)} />
      )}
    </StyledRoot>
  );
});

const StyledRoot = styled.section`
  /* for form outline */
  padding: ${({ theme }) => theme.space.middle}px;
  overflow-x: hidden;
  overflow-y: scroll;
  ${({ theme }) => theme.scrollBar.hidden()}
  & > h2 {
    font-size: ${({ theme }) => theme.font.size.large}px;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: ${({ theme }) => theme.space.large * 2}px;
  }
  & > div {
    & > * {
      margin-bottom: ${({ theme }) => theme.space.large * 2}px;
    }
  }
`;

const SaveButton = styled(Button)`
  width: 100%;
  position: sticky;
  ${({ theme }) => theme.insetSafeArea.bottom('bottom', '0px', '+')}
`;
