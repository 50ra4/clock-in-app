import { useFormGroup, FormGroupError } from 'hooks/useFormGroup';
import { useMemo } from 'react';
import { DailyTimeRecord } from 'types';
import {
  dateStringValidatorFactory,
  timeValidatorFactory,
  remarksValidatorFactory,
  inHouseWorkValidatorFactory,
  restTimeValidatorFactory,
} from 'utils/validation/validations';
import { toValidationErrorMessage } from 'utils/validationUtil';

const validateDate = dateStringValidatorFactory.create({ required: true });
const validateTime = timeValidatorFactory.create({ required: false });
const validateRemarks = remarksValidatorFactory.create({ required: false, maxLength: 100 });
const validateInHouseWork = inHouseWorkValidatorFactory.create({ required: true });
const validateRestTime = restTimeValidatorFactory.create({ required: true });

export const useInputRecordForm = (initialState: DailyTimeRecord) => {
  const { formState, onChangeFormState } = useFormGroup(initialState);

  const formErrors: FormGroupError<DailyTimeRecord> = {
    date: useMemo(() => toValidationErrorMessage(validateDate(formState.date)), [formState.date]),
    start: useMemo(() => toValidationErrorMessage(validateTime(formState.start)), [formState.start]),
    end: useMemo(() => toValidationErrorMessage(validateTime(formState.end)), [formState.end]),
    remarks: useMemo(() => toValidationErrorMessage(validateRemarks(formState.remarks)), [formState.remarks]),
    inHouseWorks: useMemo(
      () => formState.inHouseWorks.map((v) => toValidationErrorMessage(validateInHouseWork(v))),
      [formState.inHouseWorks],
    ),
    restTimes: useMemo(
      () => formState.restTimes.map((v) => toValidationErrorMessage(validateRestTime(v))),
      [formState.restTimes],
    ),
  };

  return { formState, onChangeFormState, formErrors };
};
