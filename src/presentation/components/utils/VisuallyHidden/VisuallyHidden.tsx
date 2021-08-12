import React from 'react';
import styled from 'styled-components';
import { matchClassNames } from 'utils/classNameUtil';

type OwnProps = {
  className?: string;
  hidden: boolean;
  children: React.ReactNode;
};

/**
 * Do not show elements, but screen readers can read
 */
export const VisuallyHidden = React.memo(function VisuallyHidden({ className = '', hidden, children }: OwnProps) {
  const rootClassName = matchClassNames([
    [className, () => !!className],
    ['visually-hidden--hidden', () => hidden],
  ]);
  return <Wrap className={rootClassName.join(' ')}>{children}</Wrap>;
});

/**
 * @see https://qiita.com/randy39/items/fca820d500dfe9ec1a52
 */
const Wrap = styled.div`
  &.visually-hidden--hidden {
    position: fixed !important;
    /* keep it on viewport */
    top: 0px !important;
    left: 0px !important;
    /* give it non-zero size, VoiceOver on Safari requires at least 2 pixels
     before allowing buttons to be activated. */
    width: 4px !important;
    height: 4px !important;
    /* visually hide it with overflow and opacity */
    opacity: 0 !important;
    overflow: hidden !important;
    /* remove any margin or padding */
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    /* ensure no other style sets display to none */
    display: block !important;
    visibility: visible !important;
  }
`;
