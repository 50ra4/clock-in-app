import React from 'react';
import { Divider } from './Divider';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Divider, {
  title: 'display/Divider',
});

const Template = createStoryTemplate(Divider);

export const Docs = Template.bind({});
Docs.args = {};

export const Sample = () => {
  return (
    <>
      <p>sample1</p>
      <Divider />
      <p>sample2</p>
    </>
  );
};
