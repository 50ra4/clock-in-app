import { DATE_FORMAT } from 'constants/dateFormat';
import { DAILY_RECORDS_COLLECTION_PATH } from 'constants/firestore';
import { DailyTimeRecord } from 'types';
import { omitUndefinedProps } from 'utils/converterUtil';
import { dateStringToDateString } from 'utils/dateUtil';
import { replacePathParams } from 'utils/pathUtil';
import { firestore, firebase } from './firebase';

export const saveDailyTimeRecord = async (uid: string, data: DailyTimeRecord) => {
  const month = dateStringToDateString(data.date, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });

  // TODO: Save restTimes and inHouseWorks separately
  const { restTimes, inHouseWorks, ...rest } = data;
  const path = replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month });
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const document = await firestore.collection(path).doc(rest.date).get();

  if (document.exists) {
    return document.ref.set({
      ...omitUndefinedProps<Omit<DailyTimeRecord, 'restTimes' | 'inHouseWorks'>>(rest),
      updatedAt: timestamp,
    });
  } else {
    return document.ref.set({
      ...omitUndefinedProps<Omit<DailyTimeRecord, 'restTimes' | 'inHouseWorks'>>(rest),
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
};
