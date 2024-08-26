import { useEffect, useState } from "react";
import style from "./AreaLoading.module.css";

export interface IAreaLoadingProps {
  className?: string;
  loading?: boolean;
  transitionMillis?: number;
}

export function AreaLoading(props: IAreaLoadingProps) {
  const [fillArea, setFillArea] = useState(false);
  const [areaOpacity, setAreaOpacity] = useState(0.0);
  const transitionMillis = props.transitionMillis ?? 300;

  useEffect(() => {
    if (props.loading) {
      setFillArea(true);
      setAreaOpacity(0.0);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        setAreaOpacity(1.0);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setFillArea(true);
      setAreaOpacity(0.0);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        setFillArea(false);
      }, transitionMillis + 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [props.loading, transitionMillis]);

  return fillArea ? (
    <div
      className={style.loader + " " + props.className}
      style={{
        opacity: `${areaOpacity}`,
        transition: `opacity ease ${transitionMillis}ms`,
      }}
    >
      <div className={style.loaderInner}>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
