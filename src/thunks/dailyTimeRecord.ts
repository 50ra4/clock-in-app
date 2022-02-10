import { readDailyTimeRecordOfMonth } from 'services/dailyTimeRecord';
import { dailyTimeRecordModule } from 'store/dailyTimeRecord';
import { AppDispatch } from 'store/root';

export const loadMonthlyRecord = (uid: string, month: string) => async (dispatch: AppDispatch) => {
  return readDailyTimeRecordOfMonth(uid, month).then((records) => {
    dispatch(dailyTimeRecordModule.actions.updateMonthly(records, uid, month));
  });
};
