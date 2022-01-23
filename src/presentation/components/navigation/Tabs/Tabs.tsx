import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'presentation/styles/theme';

type TabColor = Exclude<ColorPalette, 'default'>;

export type TabItem<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  className?: string;
  items: TabItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
  color?: TabColor;
};

/**
 * @see https://www.w3schools.com/howto/howto_js_tabs.asp
 */
export const Tabs = React.memo(function Tabs<T>({
  className,
  value: selectedValue,
  onChange,
  items,
  color = 'primary',
}: Props<T>) {
  return (
    <Root className={className} color={color}>
      {items.map(({ label, value }) => (
        <TabItems
          type="button"
          color={color}
          isActive={value === selectedValue}
          onClick={() => {
            if (value === selectedValue) return;
            if (!onChange) return;
            onChange(value);
          }}
        >
          {label}
        </TabItems>
      ))}
    </Root>
  );
}) as <T>(props: T) => JSX.Element;

const Root = styled.div<{ color: TabColor }>`
  overflow: hidden;
  color: ${({ theme }) => theme.color.palette.default.font};
  background-color: ${({ theme }) => theme.color.palette.default.background};
`;

const TabItems = styled.button<{ color: TabColor; isActive?: boolean }>`
  color: ${({ isActive, color, theme }) => (isActive ? theme.color.palette[color].font : 'inherit')};
  background-color: ${({ isActive, color, theme }) => (isActive ? theme.color.palette[color].background : 'inherit')};
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
`;
