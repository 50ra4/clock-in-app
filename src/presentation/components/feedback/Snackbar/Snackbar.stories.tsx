import { useState } from 'react';
import { Snackbar } from './Snackbar';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Snackbar, {
  title: 'feedback/Snackbar',
});

const Template = createStoryTemplate(Snackbar);

export const Docs = Template;
Docs.args = {
  context: 'show snackbar',
};

export const Info = () => {
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
      <Snackbar duration={3000} open={open} content="Some text some message.." onClose={() => setOpen(false)} />
    </>
  );
};
