import { ErrorCode } from 'constants/error';

export class AppError extends Error {
  public readonly name = 'AppError';
  public readonly code: ErrorCode;
  public readonly message: string;
  public readonly crashed: boolean;
  public readonly stack?: string;

  constructor(
    code: ErrorCode,
    { message, stack, crashed = false }: { message: string; stack?: string; crashed?: boolean },
  ) {
    super();
    this.code = code;
    this.message = message;
    this.crashed = crashed;
    this.stack = stack;
  }
}
