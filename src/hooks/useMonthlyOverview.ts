import { useCallback, useMemo } from 'react';
import { DailyTimeRecord, TimecardUserPreference } from 'types';
import { toOverviewOfOperatingTimes } from 'utils/converterUtil';

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
    const overviewOfOperatingTimes = toOverviewOfOperatingTimes(month, dailyTimeRecords);
    // TODO: add daily summary
    return overviewOfOperatingTimes;
  }, [dailyTimeRecords, month]);

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
