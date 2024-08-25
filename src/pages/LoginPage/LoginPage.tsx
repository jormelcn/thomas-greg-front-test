import classNames from "classnames";
import style from "./LoginPage.module.css";
import { useForm, useFormProps } from "src/hooks/useForm";
import { useMemo } from "react";

interface LoginFormValue {
  email?: string;
  password?: string;
}

export function LoginPage() {
  const useFormProps = useMemo<useFormProps<LoginFormValue>>(
    () => ({
      onValidSubmit(value) {
        console.log("Valid Submit");
        console.log(value);
      },
      onChange(value) {
        console.log("Change");
        console.log(value);
      },
    }),
    []
  );

  const { value, handleEvent, handleSubmit } =
    useForm<LoginFormValue>(useFormProps);

  return (
    <div className={style.page}>
      <div className={style.formContainer}>
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className={classNames(style.form, "form")}
        >
          <fieldset>
            <div>
              <label htmlFor="login-form-email">Correo electrónico</label>
              <input
                id="login-form-email"
                type="email"
                name="email"
                value={value.email ?? ""}
                onChange={handleEvent}
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="login-form-password">Contraseña</label>
              <input
                id="login-form-password"
                type="password"
                name="password"
                value={value.password ?? ""}
                onChange={handleEvent}
                minLength={8}
                maxLength={15}
                required
              />
            </div>
            <div>
              <button type="submit" className="btn">
                Iniciar sesión
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
