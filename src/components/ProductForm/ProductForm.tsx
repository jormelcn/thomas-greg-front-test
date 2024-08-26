import { useMemo } from "react";
import { useForm, useFormProps } from "src/hooks/useForm";
import { Button } from "../Button";

export interface ProductFormValue {
  name: string;
  unitPrice: string;
  currency: string;
}

export interface ProductFormProps {
  disabled?: boolean;
  loading?: boolean;
  initValue?: ProductFormValue;
  onValidSubmit?: (value: ProductFormValue) => void;
}

export function ProductForm(props: ProductFormProps) {
  const useFormProps = useMemo<useFormProps<ProductFormValue>>(
    () => ({
      onValidSubmit: props.onValidSubmit,
      initValue: props.initValue,
    }),
    [props.onValidSubmit, props.initValue]
  );

  const { handleEvent, handleSubmit, value } =
    useForm<ProductFormValue>(useFormProps);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset disabled={props.disabled}>
        <div>
          <label htmlFor="product-form-name" className="required">
            Nombre
          </label>
          <input
            id="product-form-name"
            type="text"
            name="name"
            onChange={handleEvent}
            value={value.name ?? ""}
            required
          />
        </div>
        <div>
          <label htmlFor="product-form-unit-price" className="required">
            Precio unitario
          </label>
          <input
            id="product-form-unit-price"
            type="string"
            name="unitPrice"
            onChange={handleEvent}
            value={value.unitPrice ?? ""}
            required
          />
        </div>
        <div>
          <label htmlFor="product-form-currency" className="required">
            Moneda
          </label>
          <select
            id="product-form-currency"
            name="currency"
            onChange={handleEvent}
            value={value.currency ?? ""}
            required
          >
            <option value=""></option>
            <option value="COP">COP</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div className="center">
          <Button
            variant="contained"
            loading={props.loading}
            className="btn"
            type="submit"
          >
            Guardar
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
