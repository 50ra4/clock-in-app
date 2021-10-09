import { ErrorCode } from 'constants/error';

export class AppError extends Error {
  public readonly name = 'AppError';
  public readonly code: ErrorCode;
  public readonly message: string;
  public readonly stack?: string;

  constructor(code: ErrorCode, { message, stack }: { message: string; stack?: string }) {
    super();
    this.code = code;
    this.message = message;
    this.stack = stack;
  }
}
