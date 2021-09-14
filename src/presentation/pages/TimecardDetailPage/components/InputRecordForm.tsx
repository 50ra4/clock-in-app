import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { TimeForm } from 'presentation/components/forms/TimeForm/TimeForm';
import { DailyTimeRecord, Time, Range } from 'types';
import { TextAreaForm } from 'presentation/components/forms/TextAreaForm/TextAreaForm';
import { TimeRangeGroupForm } from 'presentation/components/forms/TimeRangeGroupForm/TimeRangeGroupForm';

type Props = {
  className?: string;
  dailyTimeRecord: DailyTimeRecord;
};

export const InputRecordForm = React.memo(function InputRecordForm({ className, dailyTimeRecord }: Props) {
  const [state, setState] = useState({
    ...dailyTimeRecord,
    restTimes:
      dailyTimeRecord.restTimes.length > 0 ? dailyTimeRecord.restTimes : [{ start: undefined, end: undefined }],
  });

  const onChangeClockInTime = useCallback((time: Time) => {
    setState((prev) => ({ ...prev, start: time }));
  }, []);
  const onChangeClockOutTime = useCallback((time: Time) => {
    setState((prev) => ({ ...prev, end: time }));
  }, []);
  const onChangeRemarks = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, remarks: e.target?.value ?? '' }));
  }, []);
  const onChangeRestTimes = useCallback((timeRange: Range<Time>[]) => {
    setState((prev) => ({ ...prev, restTimes: timeRange }));
  }, []);

  return (
    <StyledRoot className={className}>
      <TimeForm
        type="text"
        id="clock-in-time"
        name="clock-in-time"
        value={state.start}
        label="出社"
        required={false}
        inline={true}
        onBlur={onChangeClockInTime}
        onChange={onChangeClockInTime}
      />
      <TimeForm
        type="text"
        id="clock-out-time"
        name="clock-out-time"
        value={state.end}
        label="退社"
        required={false}
        inline={true}
        onBlur={onChangeClockOutTime}
        onChange={onChangeClockOutTime}
      />
      <TimeRangeGroupForm
        type="text"
        id="rest-time"
        name="rest-time"
        label="休憩時間"
        value={state.restTimes}
        inline={true}
        onChange={onChangeRestTimes}
      />
      <TextAreaForm
        id="remarks"
        name="remarks"
        label="備考"
        row={3}
        value={state.remarks}
        inline={true}
        onChange={onChangeRemarks}
      />
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  overflow-y: scroll;
  max-height: calc(100vh - 160px);
  ${({ theme }) => theme.scrollBar.hidden()}

  & > * {
    padding: ${({ theme }) => theme.space.middle}px;
  }
`;
