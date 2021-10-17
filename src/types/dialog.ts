import React from 'react';
import { DIALOG_TYPE } from 'constants/dialog';
import { EnumValue } from 'types';

export type DialogType = EnumValue<typeof DIALOG_TYPE>;

type DialogCommonProps<T extends DialogType> = {
  type: T;
  title?: string;
  message: string | React.ReactNode;
};
type WithResolver<T> = T & {
  resolve: (key: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ResolveKey<K = unknown> = {
  [DIALOG_TYPE.popup]: 'close';
  [DIALOG_TYPE.alert]: 'close' | 'ok';
  [DIALOG_TYPE.confirm]: 'close' | 'ok';
  [DIALOG_TYPE.select]: 'close' | 'yes' | 'no';
  // [DIALOG_TYPE.custom]: K;
};
export type DialogResolveKey<T extends DialogType, K> = ResolveKey<K>[T];

export type PopupDialog = DialogCommonProps<'popup'>;
type PopupDialogWithResolver = WithResolver<PopupDialog>;

export type AlertDialog = DialogCommonProps<'alert'>;
type AlertDialogWithResolver = WithResolver<AlertDialog>;

export type ConfirmDialog = DialogCommonProps<'confirm'>;
type ConfirmDialogWithResolver = WithResolver<ConfirmDialog>;

export type SelectDialog = DialogCommonProps<'select'>;
type SelectDialogWithResolver = WithResolver<SelectDialog>;

// export type CustomDialog = Omit<DialogCommonProps<'custom'>, 'message'> & {
//   id: string;
//   children: string | React.ReactNode;
//   actions?: React.ReactNode;
// };
// type CustomDialogWithResolver = WithResolver<CustomDialog>;

export type Dialog = PopupDialog | AlertDialog | ConfirmDialog | SelectDialog;
// | CustomDialog;
export type DialogWithResolver =
  | PopupDialogWithResolver
  | AlertDialogWithResolver
  | ConfirmDialogWithResolver
  | SelectDialogWithResolver;
// | CustomDialogWithResolver;
