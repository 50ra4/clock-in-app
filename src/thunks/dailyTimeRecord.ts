import { DATE_FORMAT } from 'constants/dateFormat';
import {
  readDailyTimeRecordOfMonth,
  readDailyTimeRecord,
  writeDailyTimeRecord,
  deleteDailyTimeRecord,
} from 'services/dailyTimeRecord';
import { dailyTimeRecordModule } from 'store/dailyTimeRecord';
import { AppDispatch } from 'store/root';
import { DailyTimeRecord } from 'types';
import { dateStringToDateString } from 'utils/dateUtil';

export const loadDailyTimeRecordOfMonth = (uid: string, month: string) => async (dispatch: AppDispatch) =>
  readDailyTimeRecordOfMonth(uid, month).then((records) => {
    dispatch(dailyTimeRecordModule.actions.updateMonthly(records, uid, month));
  });

export const loadDailyTimeRecord = (uid: string, month: string, date: string) => async (dispatch: AppDispatch) =>
  readDailyTimeRecord(uid, date).then((record) => {
    dispatch(dailyTimeRecordModule.actions.updateDaily(record, uid, month));
  });

export const updateDailyTimeRecord = (uid: string, data: DailyTimeRecord) => async (dispatch: AppDispatch) => {
  const month = dateStringToDateString(data.date, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });
  return writeDailyTimeRecord(uid, data).then(() => dispatch(loadDailyTimeRecord(uid, month, data.date)));
};

export const removeDailyTimeRecord = (uid: string, date: string) => async (dispatch: AppDispatch) => {
  const month = dateStringToDateString(date, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });
  return deleteDailyTimeRecord(uid, date).then(() =>
    dispatch(dailyTimeRecordModule.actions.removeDaily(date, uid, month)),
  );
};
