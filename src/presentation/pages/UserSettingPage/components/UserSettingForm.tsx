import React from 'react';
import styled from 'styled-components';
import { TimeRangeForm } from 'presentation/components/forms/TimeRangeForm/TimeRangeForm';
import { MinuteForm } from 'presentation/components/forms/MinuteForm/MinuteForm';
import { TimecardUserPreference } from 'types';
import { useFormGroup } from 'hooks/useFormGroup';
import { RestTimeFormGroup } from 'presentation/components/unique/RestTimeFormGroup/RestTimeFormGroup';
import { DayOfWeekCheckForm } from 'presentation/components/unique/DayOfWeekCheckForm/DayOfWeekCheckForm';

const INITIAL_FORM_STATE: TimecardUserPreference = {
  workingHours: {},
  roundDownMinutes: 15,
  restTimes: [],
  regularHolidays: [],
};

type Props = {
  className?: string;
  readOnly: boolean;
  inline?: boolean;
};

export const UserSettingForm = React.memo(function UserSettingForm({ className, readOnly }: Props) {
  const { formState, onChangeFormState } = useFormGroup({ ...INITIAL_FORM_STATE });

  return (
    <StyledRoot className={className}>
      <TimeRangeForm
        id="working-hours"
        name="working-hours"
        label="定時"
        type="input"
        value={formState.workingHours}
        readOnly={readOnly}
        disabled={readOnly}
        error={undefined} // FIXME:
        onChange={(v) => {
          onChangeFormState('workingHours', v);
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
        value={formState.roundDownMinutes}
        error={undefined} // FIXME:
        onChange={(v) => {
          onChangeFormState('roundDownMinutes', v);
        }}
        onClear={() => {
          onChangeFormState('roundDownMinutes', 0);
        }}
      />
      <RestTimeFormGroup
        type="input"
        value={formState.restTimes}
        readOnly={readOnly}
        disabled={readOnly}
        errors={[]} // FIXME:
        sortable={true}
        max={5}
        onChange={(value) => {
          onChangeFormState('restTimes', value);
        }}
      />
      <DayOfWeekCheckForm
        id="regular-holidays"
        name="regular-holidays"
        values={formState.regularHolidays}
        label="休日"
        error={undefined} // FIXME:
        onChange={(value) => {
          onChangeFormState('regularHolidays', value);
        }}
      />
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  overflow-y: scroll;
  ${({ theme }) => theme.scrollBar.hidden()}

  & > * {
    padding: ${({ theme }) => theme.space.middle}px;
  }
`;
