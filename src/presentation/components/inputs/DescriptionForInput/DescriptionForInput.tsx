import React from 'react';
import styled from 'styled-components';

export type DescriptionForInputProps = {
  className?: string;
  description: string;
};

function UnStyledDescriptionForInput({ className, description }: DescriptionForInputProps) {
  return (
    <div className={className}>
      <p>{description}</p>
    </div>
  );
}

export const DescriptionForInput = styled(UnStyledDescriptionForInput)`
  margin: ${({ theme }) => `${theme.space.large}px 0`};
  & > p {
    font-size: ${({ theme }) => theme.font.size.small}px;
    line-height: 24px;
  }
`;
