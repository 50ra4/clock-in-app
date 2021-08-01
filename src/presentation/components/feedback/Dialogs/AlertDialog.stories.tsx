import { useState } from 'react';
import { AlertDialog } from './AlertDialog';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(AlertDialog, {
  title: 'feedback/Dialogs/AlertDialog',
});

const Template = createStoryTemplate(AlertDialog);

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
      <AlertDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="AlertDialog Sample"
        onClickOK={onClickOK}
        message="Are you positive?"
      />
    </>
  );
};
