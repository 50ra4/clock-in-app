import { useFormGroup, ValidationGroup } from 'hooks/useFormGroup';
import { DailyTimeRecord } from 'types';
import {
  isInvalidDateString,
  isInvalidInHouseWork,
  isInvalidRemarksInDailyTimeRecord,
  isInvalidRestTime,
  isInvalidTime,
} from 'utils/validation/validations';

const validations: ValidationGroup<DailyTimeRecord> = {
  date: isInvalidDateString({ required: true }),
  start: isInvalidTime({ required: false }),
  end: isInvalidTime({ required: false }),
  remarks: isInvalidRemarksInDailyTimeRecord({ required: false }),
  inHouseWorks: isInvalidInHouseWork({ required: true }),
  restTimes: isInvalidRestTime({ required: true }),
};

export const useInputRecordForm = (initialState: DailyTimeRecord) => {
  const { formState, onChangeFormState, formErrors } = useFormGroup(initialState, validations);
  return { formState, onChangeFormState, formErrors };
};
