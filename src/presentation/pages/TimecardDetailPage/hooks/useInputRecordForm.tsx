import { useFormGroup, ValidationGroup } from 'hooks/useFormGroup';
import { DailyTimeRecord } from 'types';
import {
  dateStringValidatorFactory,
  timeValidatorFactory,
  remarksValidatorFactory,
  inHouseWorkValidatorFactory,
  restTimeValidatorFactory,
} from 'utils/validation/validations';

const validateDate = dateStringValidatorFactory.create({ required: true });
const validateTime = timeValidatorFactory.create({ required: false });
const validateRemarks = remarksValidatorFactory.create({ required: false, maxLength: 100 });
const validateInHouseWorks = inHouseWorkValidatorFactory.create({ required: true });
const validateRestTimes = restTimeValidatorFactory.create({ required: true });

const validations: ValidationGroup<DailyTimeRecord> = {
  date: validateDate,
  start: validateTime,
  end: validateTime,
  remarks: validateRemarks,
  inHouseWorks: validateInHouseWorks,
  restTimes: validateRestTimes,
};

export const useInputRecordForm = (initialState: DailyTimeRecord) => {
  const { formState, onChangeFormState, formErrors } = useFormGroup(initialState, validations);
  return { formState, onChangeFormState, formErrors };
};
