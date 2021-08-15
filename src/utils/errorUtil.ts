import { ERROR_HEADING_WITH_MESSAGE } from 'constants/error';
import { ErrorHeadingWithMessage } from 'types';

export const errorToHeadingWithMessage = <E extends Error>(error: E): ErrorHeadingWithMessage => {
  // TODO: 中身を実装する
  return ERROR_HEADING_WITH_MESSAGE.UNKNOWN;
};
