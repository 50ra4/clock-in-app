import { useState } from 'react';
import { Backdrop } from './Backdrop';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export default createStoryMeta(Backdrop, {
  title: 'feedback/Backdrop',
});

const Template = createStoryTemplate(Backdrop);

export const Docs = Template;
Docs.args = {};

export const WithLoading = () => {
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
      <Backdrop
        open={open}
        onClick={() => {
          setOpen(false);
        }}
      >
        <LoadingSpinner iconSize="extraLarge" message="ローディング中" />
      </Backdrop>
    </>
  );
};
