import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(ConfirmDialog, {
  title: 'feedback/Dialogs/ConfirmDialog',
});

const Template = createStoryTemplate(ConfirmDialog);

export const Docs = Template;
Docs.args = {};

export const ShowDialog = () => {
  const [open, setOpen] = useState(false);

  const onClickOK = () => {
    window.alert('clicked ok');
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </button>
      <ConfirmDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="ConfirmDialog Sample"
        onClickOK={onClickOK}
        message="Are you positive?"
      />
    </>
  );
};
