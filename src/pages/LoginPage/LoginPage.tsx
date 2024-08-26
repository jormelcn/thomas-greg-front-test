import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreService } from "src/api/useStoreService";
import { useForm, useFormProps } from "src/hooks/useForm";
import style from "./LoginPage.module.css";

interface LoginFormValue {
  email?: string;
  password?: string;
}

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const storeService = useStoreService();
  const navigate = useNavigate();

  const isLoginActive = useMemo(
    () => storeService.isLoginActive(),
    [storeService]
  );

  const callLoginApi = useCallback(
    async (value: LoginFormValue) => {
      setLoading(true);
      const result = await storeService.login({
        username: value.email!,
        password: value.password!,
      });
      setLoading(false);
      if (result.isSuccess) {
        navigate("/admin/products");
      } else {
        if (result.status == 401) {
          alert("Error al iniciar sesión, verifica tu usuario y contraseña");
        } else {
          alert("Lo sentimos, encontramos un inesperado en nuestros servicios");
        }
      }
    },
    [navigate, storeService]
  );

  const useFormProps = useMemo<useFormProps<LoginFormValue>>(
    () => ({
      onValidSubmit(value) {
        callLoginApi(value);
      },
    }),
    [callLoginApi]
  );

  const { value, handleEvent, handleSubmit } =
    useForm<LoginFormValue>(useFormProps);

  return (
    <div className={style.page}>
      <div className={style.formContainer}>
        {isLoginActive && (
          <div>
            <p>Ya has iniciado sesión</p>
            <button className="btn" onClick={() => navigate("/admin")}>
              Ir a la pagina principal
            </button>
            <button className="btn" onClick={() => navigate("/logout")}>
              Cerrar sesión
            </button>
          </div>
        )}
        {!isLoginActive && (
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
              <div className="center">
                <button
                  type="submit"
                  className={classNames("btn", loading && "loading")}
                >
                  Iniciar sesión
                </button>
              </div>
            </fieldset>
          </form>
        )}
      </div>
    </div>
  );
}
