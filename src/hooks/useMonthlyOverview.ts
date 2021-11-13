import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { showSnackbar } from 'thunks/snackbar';
import { DailyTimeRecord, TimecardUserPreference } from 'types';
import {
  toDetailsOfDailyTimeRecords,
  toOverviewOfOperatingTimes,
  toOverviewOfTimecardPreference,
} from 'utils/converterUtil';

/**
 * month:年月（yyyy-MM形式）
 */
type Props = {
  month: string;
  dailyTimeRecords: DailyTimeRecord[];
  preference?: TimecardUserPreference;
};

export const useMonthlyOverview = ({ month, dailyTimeRecords, preference }: Props) => {
  const dispatch = useDispatch();
  const monthlyOverview = useMemo(() => {
    const overviewOfOperatingTimes = [
      '【稼働時間概要】', //
      toOverviewOfOperatingTimes(month, dailyTimeRecords),
    ].join('\n');
    const detailsOfDailyTimeRecords = [
      '【稼働詳細】', //
      toOverviewOfTimecardPreference({
        workingTimes: preference?.workingTimes,
        lunchBreak: preference?.lunchRestTime,
      }),
      toDetailsOfDailyTimeRecords(month, dailyTimeRecords, preference?.regularHolidays),
    ].join('\n');

    return [overviewOfOperatingTimes, detailsOfDailyTimeRecords].join('\n\n');
  }, [dailyTimeRecords, month, preference]);

  const copyMonthlyOverviewToClipboard = useCallback(() => {
    if (!window?.navigator?.clipboard?.writeText) {
      dispatch(showSnackbar({ severity: 'error', content: 'ご利用中のブラウザには未対応のようです' }));
      return;
    }
    window.navigator.clipboard
      .writeText(monthlyOverview)
      .then(() => {
        dispatch(showSnackbar({ severity: 'success', content: 'クリップボードに貼り付けました' }));
      })
      .catch(() => {
        dispatch(showSnackbar({ severity: 'error', content: 'お手数ですが、再度お試しください' }));
      });
  }, [dispatch, monthlyOverview]);

  return {
    monthlyOverview,
    copyMonthlyOverviewToClipboard,
  } as const;
};
