import { useCallback, useMemo } from 'react';
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
  const monthlyOverview = useMemo(() => {
    const overviewOfOperatingTimes = [
      '【稼働時間概要】', //
      toOverviewOfOperatingTimes(month, dailyTimeRecords),
    ].join('\n');
    const detailsOfDailyTimeRecords = [
      '【稼働詳細】', //
      toOverviewOfTimecardPreference({
        workingTimes: preference?.workingTimes,
        // FIXME: use correct lunch break data
        lunchBreak: preference?.restTimes[0],
      }),
      toDetailsOfDailyTimeRecords(month, dailyTimeRecords, preference?.regularHolidays),
    ].join('\n');

    return [overviewOfOperatingTimes, detailsOfDailyTimeRecords].join('\n\n');
  }, [dailyTimeRecords, month, preference]);

  const copyMonthlyOverviewToClipboard = useCallback(() => {
    // FIXME: replace with snackbar
    if (!window?.navigator?.clipboard?.writeText) {
      window.alert('ご利用中のブラウザには対応していません!');
      return;
    }
    window.navigator.clipboard
      .writeText(monthlyOverview)
      .then(() => {
        window.alert('クリップボードに貼り付けました!');
      })
      .catch(() => {
        window.alert('失敗しました、再度お試しください!');
      });
  }, [monthlyOverview]);

  return {
    monthlyOverview,
    copyMonthlyOverviewToClipboard,
  } as const;
};
