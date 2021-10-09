import React from 'react';
import styled from 'styled-components';
import { TimeForm } from 'presentation/components/forms/TimeForm/TimeForm';
import { DailyTimeRecord } from 'types';
import { TextAreaForm } from 'presentation/components/forms/TextAreaForm/TextAreaForm';
import { RestTimesForm } from 'presentation/components/unique/RestTimesForm/RestTimesForm';
import { InHouseWorksForm } from 'presentation/components/unique/InHouseWorksForm/InHouseWorksForm';
import { FormGroupChangeFn } from '../hooks/useFormGroup';

type Props = {
  className?: string;
  readOnly: boolean;
  dailyTimeRecord: DailyTimeRecord;
  onChangeDailyTimeRecord: FormGroupChangeFn<DailyTimeRecord>;
};

export const InputRecordForm = React.memo(function InputRecordForm({
  className,
  readOnly,
  dailyTimeRecord: { start, end, restTimes, inHouseWorks, remarks },
  onChangeDailyTimeRecord,
}: Props) {
  return (
    <StyledRoot className={className}>
      <TimeForm
        type="text"
        id="clock-in-time"
        name="clock-in-time"
        value={start}
        label="出社"
        readOnly={readOnly}
        disabled={readOnly}
        required={false}
        inline={true}
        onBlur={(value) => {
          onChangeDailyTimeRecord('start', value);
        }}
        onChange={(value) => {
          onChangeDailyTimeRecord('start', value);
        }}
      />
      <TimeForm
        type="text"
        id="clock-out-time"
        name="clock-out-time"
        value={end}
        label="退社"
        readOnly={readOnly}
        disabled={readOnly}
        required={false}
        inline={true}
        onBlur={(value) => {
          onChangeDailyTimeRecord('end', value);
        }}
        onChange={(value) => {
          onChangeDailyTimeRecord('end', value);
        }}
      />
      <RestTimesForm
        type="text"
        id="rest-time"
        name="rest-time"
        label="休憩時間"
        value={restTimes}
        readOnly={readOnly}
        disabled={readOnly}
        inline={true}
        onChange={(value) => {
          onChangeDailyTimeRecord('restTimes', value);
        }}
      />
      <InHouseWorksForm
        type="text"
        id="in-house-works"
        name="in-house-works"
        label="社内作業"
        value={inHouseWorks}
        readOnly={readOnly}
        disabled={readOnly}
        inline={true}
        onChange={(value) => {
          onChangeDailyTimeRecord('inHouseWorks', value);
        }}
      />
      <TextAreaForm
        id="remarks"
        name="remarks"
        label="備考"
        row={3}
        value={remarks}
        readOnly={readOnly}
        disabled={readOnly}
        inline={true}
        onChange={(e) => {
          onChangeDailyTimeRecord('remarks', e.target?.value);
        }}
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
