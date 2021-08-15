import { ErrorHeadingWithMessage, EnumValue } from 'types';

export const ERROR_CODE = {
  notFound: 'NOT_FOUND',
  serviceTemporarilyUnavailable: 'SERVICE_TEMPORARILY_UNAVAILABLE',
  unknown: 'UNKNOWN',
} as const;
type ErrorCode = EnumValue<typeof ERROR_CODE>;

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
  // [ERROR_CODE.template]: {heading: '', message: ''},
};
