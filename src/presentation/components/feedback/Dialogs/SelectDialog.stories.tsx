import { useState } from 'react';
import { SelectDialog } from './SelectDialog';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(SelectDialog, {
  title: 'feedback/Dialogs/SelectDialog',
});

const Template = createStoryTemplate(SelectDialog);

export const Docs = Template;
Docs.args = {};

export const ShowDialog = () => {
  const [open, setOpen] = useState(false);

  const onClickYes = () => {
    window.alert('clicked Yes');
  };
  const onClickNo = () => {
    window.alert('clicked No');
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
      <SelectDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="SelectDialog Sample"
        onClickYes={onClickYes}
        onClickNo={onClickNo}
        message="Are you positive?"
      />
    </>
  );
};
