import React from 'react';
import styled from 'styled-components';
import { WarningIcon } from 'presentation/components/display/Icons/WarningIcon';

export type ErrorMessageForFormProps = {
  className?: string;
  message: string;
};

function UnStyledErrorMessageForForm({ className, message }: ErrorMessageForFormProps) {
  return (
    <div className={className}>
      <StyledWarningIcon />
      <p>{message}</p>
    </div>
  );
}

const StyledWarningIcon = styled(WarningIcon)``;
export const ErrorMessageForForm = styled(UnStyledErrorMessageForForm)`
  display: flex;
  margin: ${({ theme }) => `${theme.space.large}px 0`};

  & > * {
    height: 24px;
    line-height: 24px;
  }
  & > ${StyledWarningIcon} {
    fill: ${({ theme }) => theme.color.font.red};
    margin-right: ${({ theme }) => theme.space.middle}px;
  }
  & > p {
    color: ${({ theme }) => theme.color.font.red};
    font-size: ${({ theme }) => theme.font.size.small}px;
  }
`;
