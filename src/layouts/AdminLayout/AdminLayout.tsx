import { Outlet, useNavigate } from "react-router-dom";
import { useStoreService } from "src/api/useStoreService";
import { AdminSidePanel } from "src/components/AdminSidePanel";
import style from "./AdminLayout.module.css";

export function AdminLayout() {
  const storeService = useStoreService();
  const isLoginActive = storeService.isLoginActive();
  const navigate = useNavigate();

  return (
    <>
      {!isLoginActive && (
        <div className={style.noLogin}>
          <p>No has iniciado sesión</p>
          <button className="btn" onClick={() => navigate("/login")}>
            Ir a iniciar sesión
          </button>
        </div>
      )}
      {isLoginActive && (
        <div className={style.root}>
          <aside className={style.sideBarContainer}>
            <AdminSidePanel
              menuLinks={[
                { title: "Productos", href: "/admin/products" },
                { title: "Cerrar sessión", href: "/logout" },
              ]}
            />
          </aside>
          <main className={style.mainContainer}>
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
