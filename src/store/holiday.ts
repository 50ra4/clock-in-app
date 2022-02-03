import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HolidayLookups } from 'types';

type State = { data: HolidayLookups | undefined; updatedAt?: string };

export const holidayModule = createSlice({
  name: '[store/holiday]',
  initialState: { data: undefined } as State,
  reducers: {
    fetched: (_: State, { payload }: PayloadAction<HolidayLookups>) => {
      return {
        data: payload,
        updatedAt: new Date().toISOString(),
      };
    },
  },
});
