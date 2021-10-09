import { ERROR_HEADING_WITH_MESSAGE, ErrorCode, ERROR_CODE } from 'constants/error';
import { AppError } from 'models/AppError';
import { ErrorHeadingWithMessage } from 'types';

export const errorToHeadingWithMessage = <E extends Error>(
  error: E,
): ErrorHeadingWithMessage & { crashed?: boolean } => {
  // TODO: 中身を実装する
  if (error instanceof AppError) {
    const headingWithMessage = ERROR_HEADING_WITH_MESSAGE[error.code];
    return { ...headingWithMessage, crashed: error.crashed };
  }

  return { ...ERROR_HEADING_WITH_MESSAGE.UNKNOWN, crashed: true };
};

export const isErrorCode = (code: unknown): code is ErrorCode => Object.values(ERROR_CODE).includes(code as ErrorCode);
