import { useFormGroup, FormGroupError } from 'hooks/useFormGroup';
import { useMemo } from 'react';
import { TimecardUserPreference } from 'types';
import {
  timeRangeValidatorFactory,
  restTimeValidatorFactory,
  minuteValidatorFactory,
} from 'utils/validation/validations';
import { toValidationErrorMessage } from 'utils/validationUtil';

const validateMinute = minuteValidatorFactory.create({ required: true });
const validateTimeRange = timeRangeValidatorFactory.create({ required: true });
const validateRestTime = restTimeValidatorFactory.create({ required: true });

export const useTimecardPreferenceForm = (initialState: TimecardUserPreference) => {
  const { formState, onChangeFormState } = useFormGroup(initialState);

  const formErrors: FormGroupError<TimecardUserPreference> = {
    workingTimes: useMemo(
      () => toValidationErrorMessage(validateTimeRange(formState.workingTimes)),
      [formState.workingTimes],
    ),
    roundDownMinute: useMemo(
      () => toValidationErrorMessage(validateMinute(formState.roundDownMinute)),
      [formState.roundDownMinute],
    ),
    restTimes: useMemo(
      () => formState.restTimes.map((v) => toValidationErrorMessage(validateRestTime(v))),
      [formState.restTimes],
    ),
    /**
     * @see https://github.com/50ra4/clock-in-app/issues/92
     */
    regularHolidays: useMemo(() => [], []),
  };

  const hasFormError = Object.values(formErrors).some((error) =>
    Array.isArray(error) ? error.some((v) => !!v) : !!error,
  );

  return { formState, onChangeFormState, formErrors, hasFormError };
};
