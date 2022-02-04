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
    <Root className={className}>
      {items.map(({ label, value }) => (
        <Tab
          type="button"
          color={color}
          isActive={value === selectedValue}
          onClick={() => {
            if (value === selectedValue) return;
            if (!onChange) return;
            onChange(value);
          }}
        >
          <span>{label}</span>
        </Tab>
      ))}
    </Root>
  );
}) as <T>(props: T) => JSX.Element;

const Root = styled.div`
  height: ${({ theme }) => theme.height.tab}px;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.light};
`;

const Tab = styled.button<{ color: TabColor; isActive?: boolean }>`
  background-color: inherit;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  height: 100%;
  border-bottom: ${({ isActive, color, theme }) =>
    isActive ? `3px solid ${theme.color.palette[color].background}` : 'none'};
  margin-bottom: ${({ isActive }) => (isActive ? '0' : '3px')};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.palette.secondary.background};
    outline-offset: -2px;
  }

  & > span {
    font-size: ${({ theme }) => theme.font.size.middle}px;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ isActive, color, theme }) =>
      isActive ? theme.color.palette[color].background : theme.color.palette.default.background};
    padding: ${({ theme }) => `0 ${theme.space.large * 2}px`};
  }
`;
