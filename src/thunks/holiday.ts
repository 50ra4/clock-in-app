import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { fetchJapaneseHoliday } from 'services/holiday';
import { holidayModule } from 'store/holiday';
import { AppState } from 'store/root';

export const loadHoliday =
  () =>
  async (dispatch: ThunkDispatch<AppState, never, Action<unknown>>, getState: () => AppState): Promise<void> => {
    const current = getState().holiday.data;
    if (typeof current !== 'undefined') {
      return;
    }

    return fetchJapaneseHoliday().then((data) => {
      dispatch(holidayModule.actions.fetched(data));
    });
  };
