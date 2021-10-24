import { ErrorHeadingWithMessage, EnumValue } from 'types';

export const ERROR_CODE = {
  notFound: 'NOT_FOUND',
  failedReadData: 'FAILED_READ_DATA',
  failedWriteData: 'FAILED_WRITE_DATA',
  serviceTemporarilyUnavailable: 'SERVICE_TEMPORARILY_UNAVAILABLE',
  unknown: 'UNKNOWN',
} as const;
export type ErrorCode = EnumValue<typeof ERROR_CODE>;

export const ERROR_HEADING_WITH_MESSAGE: Readonly<Record<ErrorCode, ErrorHeadingWithMessage>> = {
  [ERROR_CODE.notFound]: {
    heading: 'ページが見つかりません',
    message: 'お探しのページが見つかりません。\nURLが正しいかご確認ください。',
  },
  [ERROR_CODE.serviceTemporarilyUnavailable]: {
    heading: 'メンテナンス中です',
    message: 'メンテナンス中のため、只今ご利用いただけません。',
  },
  [ERROR_CODE.unknown]: {
    heading: 'エラーが発生しました',
    message: 'お手数をおかけしますが、管理者にお問い合わせください。',
  },
  [ERROR_CODE.failedReadData]: {
    heading: 'エラーが発生しました',
    message: 'データの取得に失敗しました。\nお手数をおかけしますが、暫く時間をおいてから再度お試しください。',
  },
  [ERROR_CODE.failedWriteData]: {
    heading: 'エラーが発生しました',
    message: 'データの更新に失敗しました。\nお手数をおかけしますが、暫く時間をおいてから再度お試しください。',
  },
  // [ERROR_CODE.template]: {heading: '', message: ''},
};

export const VALIDATION_ERROR_MESSAGE = {
  isEmpty: '%displayName%を入力してください',
  typeIsInvalid: '%displayName%の値が不正です',
  hourIsEmpty: '時刻を入力してください',
  hourIsOutOfRange: '時刻を0から23の範囲で入力してください',
  minuteIsEmpty: '分を入力してください',
  minuteIsOutOfRange: '分を0から59の範囲で入力してください',
  timeIsEmpty: '時間を入力してください',
  timeRangeIsEmpty: '時間帯を入力してください',
  restTimeIsEmpty: '休憩時間を入力してください',
  inHouseWorkIsEmpty: '社内作業を入力してください',
  remarksIsEmpty: '備考を入力してください',
  over50Length: '50文字以内で入力してください',
  over100Length: '100文字以内で入力してください',
  dateIsEmpty: '日付を入力してください',
  dateFormatIsInvalid: '日付をyyyy-mm-ddで入力してください',
} as const;
