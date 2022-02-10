import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyTimeRecord } from 'types';

type ActionMeta = {
  uid: string;
  month: string;
  updatedAt: string;
};
type DailyData = { data: DailyTimeRecord; meta: ActionMeta };
type DailyCollection = Partial<{ [dateString: string]: DailyData }>;
type MonthlyCollection = Partial<{ [month: string]: DailyCollection }>;
type DailyTimeRecordState = Partial<{ [uid: string]: MonthlyCollection }>;

const mergePartial = <T extends Partial<Record<string, unknown>>, K extends keyof T>(
  state: T,
  key: K,
  updated: (prev?: T[K]) => T[K],
): T => ({
  ...state,
  [key]: updated(state?.[key]),
});

export const dailyTimeRecordModule = createSlice({
  name: '[store/dailyTimeRecord]',
  initialState: {} as DailyTimeRecordState,
  reducers: {
    updateMonthly: {
      prepare(payload: DailyTimeRecord[], uid: string, month: string) {
        return { payload, meta: { uid, month, updatedAt: new Date().toISOString() } };
      },
      reducer(state, action: PayloadAction<DailyTimeRecord[], string, ActionMeta>) {
        return mergePartial(state, action.meta.uid, (user) =>
          mergePartial(user ?? {}, action.meta.month, () =>
            action.payload.reduce(
              (acc, cur) => ({ ...acc, [cur.date]: { data: cur, meta: action.meta } }),
              {} as Record<string, DailyData>,
            ),
          ),
        );
      },
    },
    updateDaily: {
      prepare(payload: DailyTimeRecord, uid: string, month: string) {
        return { payload, meta: { uid, month, updatedAt: new Date().toISOString() } };
      },
      reducer(state, action: PayloadAction<DailyTimeRecord, string, ActionMeta>) {
        return mergePartial(state, action.meta.uid, (user) =>
          mergePartial(user ?? {}, action.meta.month, (month) =>
            mergePartial(month ?? {}, action.payload.date, () => ({
              data: action.payload,
              meta: action.meta,
            })),
          ),
        );
      },
    },
  },
});
