import React from 'react';
import styled from 'styled-components';
import { Link } from 'presentation/components/navigation/Link/Link';
import { PAGE_PATH } from 'constants/path';
import { ClockIcon } from '../icons/ClockIcon';

type OwnProps = {
  className?: string;
};
export type LogoProps = OwnProps;

const UnStyledLogo = React.memo(function Logo({ className }: LogoProps) {
  return (
    <Link className={className} to={PAGE_PATH.top} aria-label="'clock in' homepage">
      <h1>
        Cl
        <StyledLogoIcon />
        ck in
      </h1>
    </Link>
  );
});

const StyledLogoIcon = styled(ClockIcon)``;
export const Logo = styled(UnStyledLogo)`
  display: inline-block;
  &:hover,
  &:active {
    text-decoration: none;
  }
  & > h1 {
    color: ${({ theme }) => theme.color.palette.primary.font};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.extraLarge}px;
    letter-spacing: 0.035em;
    & > ${StyledLogoIcon} {
      min-height: 0;
      min-width: 0;
      width: 19px;
      height: 19px;
      fill: ${({ theme }) => theme.color.palette.primary.font};
      margin-left: -1px;
      vertical-align: -3px;
    }
  }
`;
