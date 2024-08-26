import { Outlet } from "react-router-dom";
import style from "./AdminLayout.module.css";
import { AdminSidePanel } from "src/components/AdminSidePanel";

export function AdminLayout() {
  return (
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
  );
}
