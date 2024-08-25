import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export interface useFormProps<T> {
  onValidSubmit?: (value: T) => void;
  onErrorSubmit?: (value: T) => void;
  onChange?: (value: T) => void;
}

export function useForm<T>(props?: useFormProps<T>) {
  const [value, setValue] = useState<object>({});

  useEffect(() => {
    if (props?.onChange) {
      props.onChange(value as T);
    }
  }, [value, props]);

  const handleChangeEvent = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value: fieldValue } = evt.target;
    setValue((v) => ({ ...v, [name]: fieldValue }));
  };

  const handleEvent = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.type === "change") {
      handleChangeEvent(evt as ChangeEvent<HTMLInputElement>);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    const form = evt.target as HTMLFormElement;
    const isValid = form.reportValidity();

    if (isValid && props?.onValidSubmit) {
      props.onValidSubmit(value as T);
    } else if (!isValid && props?.onErrorSubmit) {
      props.onErrorSubmit(value as T);
    }

    evt.preventDefault();
  };

  return {
    value: value as T,
    handleEvent,
    handleSubmit,
  };
}
