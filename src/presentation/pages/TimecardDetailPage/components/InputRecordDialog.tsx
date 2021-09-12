import React from 'react';
import styled from 'styled-components';

import { CustomDialog } from 'presentation/components/feedback/Dialogs/CustomDialog';
import { ConfirmDialogActions } from 'presentation/components/feedback/Dialogs/DialogActions';
import { DailyTimeRecord } from 'types';
import { InputRecordForm } from './InputRecordForm';

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
      // FIXME: display date format
      title={`${dailyTimeRecord.date} 勤怠情報入力`}
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
