import React from 'react';
import styled from 'styled-components';

export type DescriptionForFormProps = {
  className?: string;
  description: string;
};

const UnStyledDescriptionForForm = React.memo(function DescriptionForForm({
  className,
  description,
}: DescriptionForFormProps) {
  return (
    <div className={className}>
      <p>{description}</p>
    </div>
  );
});

export const DescriptionForForm = styled(UnStyledDescriptionForForm)`
  margin: ${({ theme }) => `${theme.space.large}px 0`};
  & > p {
    font-size: ${({ theme }) => theme.font.size.small}px;
    line-height: 24px;
  }
`;
