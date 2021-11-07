import React from 'react';
import styled from 'styled-components';

import { CustomDialog } from 'presentation/components/feedback/Dialogs/CustomDialog';
import { Button } from 'presentation/components/inputs/Button/Button';
import { TextArea } from 'presentation/components/inputs/TextArea/TextArea';

type OwnProps = {
  className?: string;
  open?: boolean;
  readOnly: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onClickCopy: () => void;
};

export const MonthlyOverviewDialog = React.memo(function MonthlyOverviewDialog({
  open = false,
  readOnly,
  title,
  text,
  className,
  onClose,
  onClickCopy,
}: OwnProps) {
  return (
    <StyledCustomDialog
      id="monthly-overview-input"
      title={title}
      open={open}
      className={className}
      onClose={onClose}
      actions={
        <>
          <StyledButton color="default" onClick={onClose} text="閉じる" />
          <StyledButton color="primary" onClick={onClickCopy} text="コピー" />
        </>
      }
    >
      <StyledTextArea id="monthly-overview" name="monthly-overview" value={text} readOnly={readOnly} />
    </StyledCustomDialog>
  );
});

const StyledCustomDialog = styled(CustomDialog)`
  width: 95%;
  max-width: 550px;
`;

const StyledButton = styled(Button)`
  min-width: 80px;
`;

const StyledTextArea = styled(TextArea)``;
