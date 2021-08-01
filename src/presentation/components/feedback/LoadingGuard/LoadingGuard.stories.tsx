import { useState } from 'react';
import { LoadingGuard } from './LoadingGuard';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(LoadingGuard, {
  title: 'feedback/LoadingGuard',
});

const Template = createStoryTemplate(LoadingGuard);

export const Docs = Template;
Docs.args = {};

export const Loading = () => {
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
      <LoadingGuard
        open={open}
        message="now loading..."
        onClick={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
