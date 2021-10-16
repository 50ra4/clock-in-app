import React from 'react';
import styled from 'styled-components';

import { Button } from 'presentation/components/inputs/Button/Button';
import { AddCircleIcon } from 'presentation/components/display/Icons/AddCircleIcon';

type Props = {
  className?: string;
  label: string;
  onClick: () => void;
};

export const AdditionalButton = React.memo(function AdditionalButton({ className, label, onClick }: Props) {
  return (
    <StyledButton className={className} onClick={onClick}>
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
`;
