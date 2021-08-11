import React from 'react';
import styled from 'styled-components';
import { Header, headerHeight } from 'presentation/components/surfaces/Header/Header';

type OwnProps = {
  className?: string;
  children: React.ReactNode;
};

const rootClassName = 'with-header-layout';
export const WithHeaderLayoutClassNames = {
  root: rootClassName,
  header: `${rootClassName}__header`,
  contents: `${rootClassName}__contents`,
} as const;

export const WithHeaderLayout = React.memo(function WithHeaderLayout({ className = '', children }: OwnProps) {
  const rootClass = [className, rootClassName].filter((c) => !!c).join(' ');

  return (
    <StyledRoot className={rootClass}>
      <Header className={WithHeaderLayoutClassNames.header} />
      <main className={WithHeaderLayoutClassNames.contents}>{children}</main>
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  & > .${WithHeaderLayoutClassNames.header} {
    width: 100%;
    position: fixed;
    left: 0;
    ${({ theme }) => theme.insetSafeArea.top('top', '0', '+')}
  }
  & > .${WithHeaderLayoutClassNames.contents} {
    width: 100%;
    ${({ theme }) => theme.insetSafeArea.top('padding-top', `${headerHeight}px`, '+')}
    ${({ theme }) => theme.insetSafeArea.top('min-height', `100vh - ${headerHeight}px`, '+')}
  }
`;
