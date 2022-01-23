import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'presentation/styles/theme';

type TabColor = Exclude<ColorPalette, 'default'>;

type Props = {
  className?: string;
  items: {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
  }[];
  color?: TabColor;
};

/**
 * @see https://www.w3schools.com/howto/howto_js_tabs.asp
 */
export const Tabs = React.memo(function Tabs({ className, items, color = 'primary' }: Props) {
  return (
    <Root className={className} color={color}>
      {items.map(({ label, isActive, onClick }) => (
        <TabItems type="button" color={color} isActive={isActive} onClick={onClick}>
          {label}
        </TabItems>
      ))}
    </Root>
  );
});

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
