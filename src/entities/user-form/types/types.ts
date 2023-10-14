export type FieldValuesList<T> = {
  [K in keyof T]: T[K];
};

export type FormFieldWithValue<T> = FormField<T> & { value: string };

export type FormFields<T> =
  | {
      all: FormFieldWithValue<T>[];
      defaults: FieldValuesList<T>;
    }
  | {
      all: null;
      defaults: null;
    };

export type FieldValuesWithAvatar = {
  avatar?: string;
} & Record<string, string>;
