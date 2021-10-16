import React from 'react';
import styled from 'styled-components';

import { CustomDialog } from 'presentation/components/feedback/Dialogs/CustomDialog';
import { ConfirmDialogActions } from 'presentation/components/feedback/Dialogs/DialogActions';
import { DailyTimeRecord } from 'types';
import { InputRecordForm } from './InputRecordForm';
import { DATE_FORMAT } from 'constants/dateFormat';
import { dateStringToDateString } from 'utils/dateUtil';
import { useFormGroup } from '../hooks/useFormGroup';

type OwnProps = {
  className?: string;
  open?: boolean;
  readOnly: boolean;
  onClose?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  dailyTimeRecord: DailyTimeRecord;
  onSaveDailyTimeRecord: (record: DailyTimeRecord) => void;
};

export const InputRecordDialog = React.memo(function InputRecordDialog({
  open = false,
  readOnly,
  onClose,
  className,
  dailyTimeRecord: initialTimeRecord,
  onSaveDailyTimeRecord,
}: OwnProps) {
  const { formState: dailyTimeRecord, onChangeFormState: onChangeDailyTimeRecord } = useFormGroup({
    ...initialTimeRecord,
    restTimes:
      initialTimeRecord.restTimes.length > 0
        ? initialTimeRecord.restTimes
        : [{ id: undefined, start: undefined, end: undefined }],
    inHouseWorks:
      initialTimeRecord.inHouseWorks.length > 0
        ? initialTimeRecord.inHouseWorks
        : [{ id: undefined, start: undefined, end: undefined, remarks: '' }],
  });

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
        <ConfirmDialogActions
          onClickOK={() => {
            onSaveDailyTimeRecord(dailyTimeRecord);
          }}
          onClose={onClose}
        />
      }
    >
      <InputRecordForm
        readOnly={readOnly}
        inline={true}
        dailyTimeRecord={dailyTimeRecord}
        onChangeDailyTimeRecord={onChangeDailyTimeRecord}
      />
    </StyledCustomDialog>
  );
});

const StyledCustomDialog = styled(CustomDialog)``;
