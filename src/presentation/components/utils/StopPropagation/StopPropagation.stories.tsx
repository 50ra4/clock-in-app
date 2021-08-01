import { useState } from 'react';
import styled from 'styled-components';
import { StopPropagation } from './StopPropagation';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { Button } from 'presentation/components/inputs/Button/Button';

export default createStoryMeta(StopPropagation, {
  title: 'utils/StopPropagation',
});

const Template = createStoryTemplate(StopPropagation);

export const Docs = Template;
Docs.args = {};

const StyledStopPropagation = styled(StopPropagation)`
  & > button {
    display: block;
  }
  & > button + button {
    margin-top: 10px;
  }
`;

export const Test = () => {
  const [stopPropagation, setStopPropagation] = useState(true);

  const onClickDiv = () => {
    // eslint-disable-next-line no-console
    console.log('clicked parent');
  };

  const onClickButton = () => {
    // eslint-disable-next-line no-console
    console.log('clicked children');
  };

  const changeStopPropagation = () => {
    setStopPropagation((prev) => !prev);
  };

  return (
    <div role="none" onClick={onClickDiv}>
      <StyledStopPropagation stopPropagation={stopPropagation}>
        <Button color="secondary" onClick={changeStopPropagation}>
          toggle
        </Button>
        <Button color="primary" onClick={onClickButton}>{`stopPropagation ${stopPropagation}`}</Button>
      </StyledStopPropagation>
    </div>
  );
};
