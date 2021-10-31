import React from 'react';
import styled from 'styled-components';
import { TimeRangeForm } from 'presentation/components/forms/TimeRangeForm/TimeRangeForm';
import { MinuteForm } from 'presentation/components/forms/MinuteForm/MinuteForm';
import { Range, RestTime, Time } from 'types';
import { useFormGroup } from 'hooks/useFormGroup';
import { RestTimeFormGroup } from 'presentation/components/unique/RestTimeFormGroup/RestTimeFormGroup';

type UserSettingFormData = {
  workingHours: Range<Time>;
  roundDownMinutes: number;
  restTimes: RestTime[];
};

const INITIAL_USER_SETTING_FORM: UserSettingFormData = {
  workingHours: {},
  roundDownMinutes: 15,
  restTimes: [],
};

type Props = {
  className?: string;
  readOnly: boolean;
  inline?: boolean;
};

export const UserSettingForm = React.memo(function UserSettingForm({ className, readOnly, inline = false }: Props) {
  const { formState, onChangeFormState } = useFormGroup({ ...INITIAL_USER_SETTING_FORM });

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
        inline={inline}
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
        inline={inline}
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
        inline={inline}
        errors={[]} // FIXME:
        sortable={true}
        max={5}
        onChange={(value) => {
          onChangeFormState('restTimes', value);
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
