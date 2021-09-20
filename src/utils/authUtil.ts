const isFireAuthenticationError = (x: unknown): x is { code: string; message: string } => {
  if (typeof x !== 'object' || x === null) {
    return false;
  }
  return 'code' in x && 'message' in x;
};

/**
 * @see https://firebase.google.com/docs/auth/admin/errors?hl=ja
 */
export const authenticationErrorToMessage = (x: unknown): string => {
  const defaultMessage = 'アカウントの作成に失敗しました。しばらく時間をおいてから再度お試しください。';
  if (!isFireAuthenticationError(x)) {
    return defaultMessage;
  }
  switch (x.code) {
    case 'auth/email-already-exists':
      return '既に登録済みのメールアドレスです。';
    default:
      return defaultMessage;
  }
};
