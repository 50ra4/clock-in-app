import { useState } from 'react';
import { PopupDialog } from './PopupDialog';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(PopupDialog, {
  title: 'feedback/Dialogs/PopupDialog',
});

const Template = createStoryTemplate(PopupDialog);

export const Docs = Template;
Docs.args = {};

export const ShowDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </button>
      <PopupDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="PopupDialog Sample"
        message="Are you positive?"
      />
    </>
  );
};
