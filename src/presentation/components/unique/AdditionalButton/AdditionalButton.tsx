import React from 'react';
import styled from 'styled-components';

import { Button } from 'presentation/components/inputs/Button/Button';
import { AddCircleIcon } from 'presentation/components/display/Icons/AddCircleIcon';

type Props = {
  className?: string;
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

export const AdditionalButton = React.memo(function AdditionalButton({ className, label, disabled, onClick }: Props) {
  return (
    <StyledButton className={className} color="primary" onClick={onClick} disabled={disabled}>
      <AddCircleIcon color="main" />
      {label}
    </StyledButton>
  );
});

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `0 ${theme.space.large}px 0 ${theme.space.middle}px`};
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 24px;
    height: 24px;
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.palette.secondary.background};
    outline-offset: -2px;
  }
`;
