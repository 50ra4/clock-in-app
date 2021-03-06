/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { BrowserRouter } from 'react-router-dom';

export type StoryMetaDecorator = NonNullable<Meta<unknown>['decorators']>[number];
type StoryMetaParameter<T> = Omit<Meta<T>, 'component'>;

export const createStoryMeta = <T extends React.FC<any>>(
  Component: T,
  parameter: StoryMetaParameter<ComponentProps<typeof Component>>,
): Meta => ({
  ...parameter,
  component: Component,
});

export const createStoryTemplate =
  <T extends React.FC<any>>(Component: T): Story<ComponentProps<typeof Component>> =>
  (args) =>
    <Component {...args} />;

export const withBrowserRouter: StoryMetaDecorator = (fn) => {
  return <BrowserRouter>{fn()}</BrowserRouter>;
};
