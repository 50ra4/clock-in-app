import React from 'react';

import { DayOfWeek, DayOfWeekCode } from 'types';
import { DAY_OF_WEEK_ENUM, DAY_OF_WEEK_LABEL_JP_ENUM } from 'constants/enum';

import { DescriptionForForm } from 'presentation/components/forms/DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from 'presentation/components/forms//ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from 'presentation/components/forms/WithLabelForForm/WithLabelForForm';
import { ChipSelector, ChipSelectorGroup } from 'presentation/components/inputs/ChipSelector/ChipSelector';
import { ColorPalette } from 'presentation/styles/theme';

const DAY_OF_WEEKS: { key: DayOfWeek; code: DayOfWeekCode; label: string }[] = (
  Object.entries(DAY_OF_WEEK_ENUM) as [DayOfWeek, DayOfWeekCode][]
).map(([key, code]) => ({ key, code, label: DAY_OF_WEEK_LABEL_JP_ENUM[key] }));

export type DayOfWeekCheckFormProps = {
  className?: string;
  id: string;
  name: string;
  label: string;
  values: DayOfWeekCode[];
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  error?: string;
  description?: string;
  color?: ColorPalette;
  onChange: (codes: DayOfWeekCode[]) => void;
};

export const DayOfWeekCheckForm = React.memo(function DayOfWeekCheckForm({
  className,
  id,
  name,
  values,
  readOnly,
  label,
  required,
  error,
  color = 'primary',
  description,
  onChange,
}: DayOfWeekCheckFormProps) {
  const handleOnChange = (checked: boolean, value: DayOfWeekCode) => {
    if (checked) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={false}>
        {description && <DescriptionForForm description={description} />}
        <ChipSelectorGroup>
          {DAY_OF_WEEKS.map((dayOfWeek) => (
            <ChipSelector
              type="checkbox"
              key={`${id}-${dayOfWeek.key}`}
              id={`${id}-${dayOfWeek.key}`}
              name={`${name}-${dayOfWeek.key}`}
              value={dayOfWeek.code}
              label={dayOfWeek.label}
              checked={values.includes(dayOfWeek.code)}
              readOnly={readOnly}
              color={color}
              onChange={handleOnChange}
            />
          ))}
        </ChipSelectorGroup>
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});
