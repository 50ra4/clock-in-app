import { useState } from 'react';
import { CustomDialog } from './CustomDialog';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(CustomDialog, {
  title: 'feedback/Dialogs/CustomDialog',
});

const Template = createStoryTemplate(CustomDialog);

export const Docs = Template;
Docs.args = {};

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const Actions = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button onClick={onClick}>Cancel</button>
      <button onClick={onClick}>OK</button>
    </>
  );
};

export const Open = () => {
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
      <CustomDialog
        id="custom-dialog"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="CustomDialog Sample"
        actions={
          <Actions
            onClick={() => {
              setOpen(false);
            }}
          />
        }
      >
        {text}
      </CustomDialog>
    </>
  );
};
