import React from 'react';
import styled from 'styled-components';

import { CustomDialog } from 'presentation/components/feedback/Dialogs/CustomDialog';
import { InputRecordDialogActions } from 'presentation/components/feedback/Dialogs/DialogActions';
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
  onDeleteDailyTimeRecord: (date: string) => void;
};

export const InputRecordDialog = React.memo(function InputRecordDialog({
  open = false,
  readOnly,
  onClose,
  className,
  dailyTimeRecord: initialTimeRecord,
  onSaveDailyTimeRecord,
  onDeleteDailyTimeRecord,
}: OwnProps) {
  const { formState: dailyTimeRecord, onChangeFormState: onChangeDailyTimeRecord } = useFormGroup(initialTimeRecord);

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
