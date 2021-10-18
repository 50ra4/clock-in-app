import React from 'react';
import styled from 'styled-components';

import { DailyTimeRecord } from 'types';
import { TimeForm } from 'presentation/components/forms/TimeForm/TimeForm';
import { TextAreaForm } from 'presentation/components/forms/TextAreaForm/TextAreaForm';
import { RestTimeFormGroup } from 'presentation/components/unique/RestTimeFormGroup/RestTimeFormGroup';
import { InHouseWorkFormGroup } from 'presentation/components/unique/InHouseWorkFormGroup/InHouseWorkFormGroup';
import { FormGroupChangeFn } from '../hooks/useFormGroup';

type Props = {
  className?: string;
  readOnly: boolean;
  inline?: boolean;
  dailyTimeRecord: DailyTimeRecord;
  onChangeDailyTimeRecord: FormGroupChangeFn<DailyTimeRecord>;
};

export const InputRecordForm = React.memo(function InputRecordForm({
  className,
  readOnly,
  inline = false,
  dailyTimeRecord: { start, end, restTimes, inHouseWorks, remarks },
  onChangeDailyTimeRecord,
}: Props) {
  return (
    <StyledRoot className={className}>
      <TimeForm
        type="input"
        id="clock-in-time"
        name="clock-in-time"
        value={start}
        label="出社"
        readOnly={readOnly}
        disabled={readOnly}
        required={false}
        inline={inline}
        onBlur={(value) => {
          onChangeDailyTimeRecord('start', value);
        }}
        onChange={(value) => {
          onChangeDailyTimeRecord('start', value);
        }}
      />
      <TimeForm
        type="input"
        id="clock-out-time"
        name="clock-out-time"
        value={end}
        label="退社"
        readOnly={readOnly}
        disabled={readOnly}
        required={false}
        inline={inline}
        onBlur={(value) => {
          onChangeDailyTimeRecord('end', value);
        }}
        onChange={(value) => {
          onChangeDailyTimeRecord('end', value);
        }}
      />
      <RestTimeFormGroup
        type="input"
        value={restTimes}
        readOnly={readOnly}
        disabled={readOnly}
        inline={inline}
        onChange={(value) => {
          onChangeDailyTimeRecord('restTimes', value);
        }}
      />
      <InHouseWorkFormGroup
        type="input"
        value={inHouseWorks}
        readOnly={readOnly}
        disabled={readOnly}
        inline={inline}
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
        inline={inline}
        onChange={(e) => {
          onChangeDailyTimeRecord('remarks', e.target?.value);
        }}
      />
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: calc(100vh - 160px);
  ${({ theme }) => theme.scrollBar.hidden()}

  & > * {
    padding: ${({ theme }) => theme.space.middle}px;
  }
`;
