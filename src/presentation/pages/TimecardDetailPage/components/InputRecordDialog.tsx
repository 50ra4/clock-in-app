import React from 'react';
import styled from 'styled-components';

import { CustomDialog } from 'presentation/components/feedback/Dialogs/CustomDialog';
import { ConfirmDialogActions } from 'presentation/components/feedback/Dialogs/DialogActions';
import { DailyTimeRecord } from 'types';
import { InputRecordForm } from './InputRecordForm';
import { DATE_FORMAT } from 'constants/dateFormat';
import { dateStringToDateString } from 'utils/dateUtil';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClickOK?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  dailyTimeRecord: DailyTimeRecord;
};

export const InputRecordDialog = React.memo(function InputRecordDialog({
  open = false,
  onClickOK,
  onClose,
  className,
  dailyTimeRecord,
  ...otherProps
}: OwnProps) {
  return (
    <StyledCustomDialog
      {...otherProps}
      id="input-record"
      title={`${dateStringToDateString(dailyTimeRecord.date, {
        from: DATE_FORMAT.dateISO,
        to: DATE_FORMAT.date,
      })} 勤怠情報入力`}
      open={open}
      className={className}
      onClose={onClose}
      actions={<ConfirmDialogActions onClickOK={onClickOK} onClose={onClose} />}
    >
      <InputRecordForm dailyTimeRecord={dailyTimeRecord} />
    </StyledCustomDialog>
  );
});

const StyledCustomDialog = styled(CustomDialog)``;
