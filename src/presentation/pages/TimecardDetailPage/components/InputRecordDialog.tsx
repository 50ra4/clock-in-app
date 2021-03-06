import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { CustomDialog } from 'presentation/components/feedback/Dialogs/CustomDialog';
import { InputRecordDialogActions } from 'presentation/components/feedback/Dialogs/DialogActions';
import { DailyTimeRecord, TimecardUserPreference } from 'types';
import { InputRecordForm } from './InputRecordForm';
import { DATE_FORMAT } from 'constants/dateFormat';
import { dateStringToDateString } from 'utils/dateUtil';
import { useInputRecordForm } from '../hooks/useInputRecordForm';

const toInitialFormState = (dailyTimeRecord: DailyTimeRecord, preference: TimecardUserPreference): DailyTimeRecord => {
  const {
    lunchRestTime: { start, end },
  } = preference;
  const restTimes =
    dailyTimeRecord.restTimes.length > 0
      ? dailyTimeRecord.restTimes
      : [{ id: undefined, start: { ...start }, end: { ...end } }];
  return { ...dailyTimeRecord, restTimes };
};

type OwnProps = {
  className?: string;
  open?: boolean;
  readOnly: boolean;
  dailyTimeRecord: DailyTimeRecord;
  preference: TimecardUserPreference;
  onClose: () => void;
  onSaveDailyTimeRecord: (record: DailyTimeRecord) => void;
  onDeleteDailyTimeRecord: (date: string) => void;
};

export const InputRecordDialog = React.memo(function InputRecordDialog({
  className,
  open = false,
  readOnly,
  dailyTimeRecord: initialTimeRecord,
  preference,
  onClose,
  onSaveDailyTimeRecord,
  onDeleteDailyTimeRecord,
}: OwnProps) {
  const {
    formState: dailyTimeRecord,
    onChangeFormState: onChangeDailyTimeRecord,
    formErrors,
    hasFormError,
  } = useInputRecordForm(toInitialFormState(initialTimeRecord, preference));

  return (
    <StyledCustomDialog
      id="input-record"
      title={`${dateStringToDateString(dailyTimeRecord.date, {
        from: DATE_FORMAT.dateISO,
        to: DATE_FORMAT.date,
      })} 勤怠情報入力`}
      open={open}
      className={className}
      onClose={onClose}
      actions={
        <InputRecordDialogActions
          onClickDelete={() => {
            onDeleteDailyTimeRecord(dailyTimeRecord.date);
          }}
          disabledOK={hasFormError}
          onClickOK={() => {
            onSaveDailyTimeRecord(dailyTimeRecord);
          }}
          onClose={onClose}
        />
      }
    >
      <InputRecordForm
        readOnly={readOnly}
        inline={!isMobile}
        dailyTimeRecord={dailyTimeRecord}
        preference={preference}
        formErrors={formErrors}
        onChangeDailyTimeRecord={onChangeDailyTimeRecord}
      />
    </StyledCustomDialog>
  );
});

const StyledCustomDialog = styled(CustomDialog)`
  width: 95%;
  max-width: 550px;
`;
