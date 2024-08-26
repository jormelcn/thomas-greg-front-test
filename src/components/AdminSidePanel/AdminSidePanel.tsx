import { ReactNode } from "react";
import style from "./AdminSidePanel.module.css";
import { Link } from "react-router-dom";

export interface IAdminMenuItem {
  title: string | null | undefined;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
}

export interface AdminSidePanelProps {
  menuLinks: IAdminMenuItem[];
}

export function AdminSidePanel(props: AdminSidePanelProps) {
  return (
    <div className={style.root}>
      <div className={style.itemsContainer}>
        <ul>
          {props.menuLinks.map((x, i) => (
            <div key={i}>
              {x.href !== undefined && (
                <li>
                  <Link to={x.href}>
                    {x.leftIcon}
                    <div>{x.title}</div>
                    {x.rightIcon}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
