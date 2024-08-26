import { useMemo } from "react";
import { Button } from "../Button";
import style from "./PaginatedTableIndex.module.css";

export interface IPaginatedTableIndexProps {
  className?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  disableNextPageButton?: boolean;
  disablePrevPageButton?: boolean;
  loading?: boolean;
}

export function PaginatedTableIndex(props: IPaginatedTableIndexProps) {
  const index = useMemo(() => {
    const min = Math.max(0, props.currentPage - 2);
    const idx = [];
    for (let i = min; i < min + 5; i++) {
      idx.push(i);
    }
    return idx;
  }, [props.currentPage]);

  return (
    <section className={style.root + " " + props.className}>
      <div className={style.indexContainer}>
        {index.map((x) => (
          <Button
            variant="text"
            disabled={
              (props.disableNextPageButton && x > props.currentPage) ||
              (props.disablePrevPageButton && x < props.currentPage)
            }
            key={x}
            loading={props.loading == true && x === props.currentPage}
            className={
              props.currentPage === x ? style.selectedIndex : undefined
            }
            onClick={() => props.onPageChange(x)}
          >
            {x + 1}
          </Button>
        ))}
      </div>
    </section>
  );
}
