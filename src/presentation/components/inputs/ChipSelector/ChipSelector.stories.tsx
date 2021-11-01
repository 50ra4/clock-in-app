import { ChipSelector, ChipSelectorGroup, ChipSelectorProps } from './ChipSelector';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { EnumValue } from 'types';
import { useState } from 'react';

export default createStoryMeta(ChipSelector, {
  title: 'inputs/ChipSelector',
});

const Template = createStoryTemplate<(props: ChipSelectorProps<string>) => JSX.Element>(ChipSelector);

export const Docs = Template.bind({});
Docs.args = {
  type: 'checkbox',
  id: 'docs',
  name: 'docs',
  label: 'docs',
  value: 'docs',
  checked: true,
  disabled: false,
  color: 'primary',
  onChange: () => {},
};

const FRUIT_NAME = {
  apple: '林檎',
  strawberry: '苺',
  orange: 'オレンジ',
  grapefruit: 'グレープフルーツ',
  coconut: 'ココナッツ',
  cherry: 'さくらんぼ',
  pineapple: 'パイナップル',
  banana: 'バナナ',
  grape: '葡萄',
  raspberry: '木苺',
} as const;
type FruitName = EnumValue<typeof FRUIT_NAME>;
const FRUIT_NAMES = Object.entries(FRUIT_NAME) as [keyof typeof FRUIT_NAME, FruitName][];

export const Radio = () => {
  const [fruitName, setFruitName] = useState<FruitName | undefined>(FRUIT_NAME.apple);
  const onChange = (checked: boolean, name: FruitName) => {
    if (!checked) {
      setFruitName(name);
    } else {
      setFruitName(undefined);
    }
  };

  return (
    <ChipSelectorGroup>
      {FRUIT_NAMES.map(([key, name]) => (
        <ChipSelector
          type="radio"
          id={`radio-${key}`}
          name={`radio-${key}`}
          label={name}
          value={name}
          disabled={name === FRUIT_NAME.strawberry}
          checked={name === fruitName}
          color="primary"
          onChange={onChange}
        />
      ))}
    </ChipSelectorGroup>
  );
};

export const Checkbox = () => {
  const [fruitNames, setFruitNames] = useState<FruitName[]>([FRUIT_NAME.apple]);
  const onChange = (checked: boolean, name: FruitName) => {
    if (!checked) {
      setFruitNames((prev) => [...prev, name]);
    } else {
      setFruitNames((prev) => prev.filter((v) => v !== name));
    }
  };

  return (
    <ChipSelectorGroup>
      {FRUIT_NAMES.map(([key, name]) => (
        <ChipSelector
          key={key}
          type="checkbox"
          id={`checkbox-${key}`}
          name={`checkbox-${key}`}
          label={name}
          value={name}
          disabled={name === FRUIT_NAME.strawberry}
          checked={fruitNames.includes(name)}
          color="secondary"
          onChange={onChange}
        />
      ))}
    </ChipSelectorGroup>
  );
};
