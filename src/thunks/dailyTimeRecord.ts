import { DATE_FORMAT } from 'constants/dateFormat';
import addMilliseconds from 'date-fns/addMilliseconds';
import isAfter from 'date-fns/isAfter';
import {
  readDailyTimeRecordOfMonth,
  readDailyTimeRecord,
  writeDailyTimeRecord,
  deleteDailyTimeRecord,
} from 'services/dailyTimeRecord';
import { dailyTimeRecordModule } from 'store/dailyTimeRecord';
import { AppDispatch, AppState } from 'store/root';
import { DailyTimeRecord } from 'types';
import { dateStringToDateString } from 'utils/dateUtil';
import { isNonNullable } from 'utils/typeGuard';

const cacheMilliseconds = 30 * 60 * 1000;

export const loadDailyTimeRecordOfMonth =
  (uid: string, month: string, options?: { shouldForce?: boolean; cache?: number }) =>
  // eslint-disable-next-line complexity
  async (dispatch: AppDispatch, getState: () => AppState) => {
    const state = getState().dailyTimeRecord?.[uid]?.[month];
    if (!options?.shouldForce && typeof state !== 'undefined') {
      const dateToCompare = addMilliseconds(new Date(), -(options?.cache ?? cacheMilliseconds));
      const isOver = !!Object.values(state ?? {})
        .filter(isNonNullable)
        .map(({ meta }) => new Date(meta.updatedAt))
        .find((date) => isAfter(dateToCompare, date));
      if (!isOver) {
        return Promise.resolve();
      }
    }

    return readDailyTimeRecordOfMonth(uid, month).then((records) => {
      dispatch(dailyTimeRecordModule.actions.updateMonthly(records, uid, month));
    });
  };

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
