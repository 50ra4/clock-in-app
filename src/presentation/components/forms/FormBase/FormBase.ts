export type FormBaseProps<T> = {
  // for style
  className?: string;

  // for input
  id: string;
  name: string;
  value: T | undefined;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;

  // for label
  label: string;
  required?: boolean;
  inline?: boolean;

  // for feedback
  error?: string;
  description?: string;
};
