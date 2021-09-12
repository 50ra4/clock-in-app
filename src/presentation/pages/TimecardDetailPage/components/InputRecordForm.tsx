import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { TimeForm } from 'presentation/components/forms/TimeForm/TimeForm';
import { DailyTimeRecord, Time } from 'types';
import { TextAreaForm } from 'presentation/components/forms/TextAreaForm/TextAreaForm';

type Props = {
  className?: string;
  dailyTimeRecord: DailyTimeRecord;
};

export const InputRecordForm = React.memo(function InputRecordForm({ className, dailyTimeRecord }: Props) {
  const [state, setState] = useState({ ...dailyTimeRecord });

  const onChangeClockInTime = useCallback((time: Time) => {
    setState((prev) => ({ ...prev, start: time }));
  }, []);
  const onChangeClockOutTime = useCallback((time: Time) => {
    setState((prev) => ({ ...prev, end: time }));
  }, []);
  const onChangeRemarks = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, remarks: e.target?.value ?? '' }));
  }, []);

  return (
    <StyledRoot className={className}>
      <TimeForm
        id="clock-in-time"
        name="clock-in-time"
        value={state.start}
        label="出社"
        type="input"
        required={false}
        inline={true}
        onBlur={onChangeClockInTime}
        onChange={onChangeClockInTime}
      />
      <TimeForm
        id="clock-out-time"
        name="clock-out-time"
        value={state.end}
        label="退社"
        type="input"
        required={false}
        inline={true}
        onBlur={onChangeClockOutTime}
        onChange={onChangeClockOutTime}
      />
      <TextAreaForm id="remarks" name="remarks" label="備考" row={3} value={state.remarks} onChange={onChangeRemarks} />
    </StyledRoot>
  );
});

const StyledRoot = styled.div``;
