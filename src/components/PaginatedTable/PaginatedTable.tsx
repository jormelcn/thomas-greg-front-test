import { Table, ITableProps, ITableRow } from "../Table";
import style from "./PaginatedTable.module.css";
import {
  PaginatedTableIndex,
  IPaginatedTableIndexProps,
} from "./PaginatedTableIndex";

export interface IPaginatedTableProps<T extends ITableRow>
  extends ITableProps<T>,
    IPaginatedTableIndexProps {}

export function PaginatedTable<T extends ITableRow>(
  props: IPaginatedTableProps<T>
) {
  const {
    className,
    onPageChange,
    disableNextPageButton,
    disablePrevPageButton,
    ...tableProps
  } = props;
  return (
    <div className={style.root + (className ? ` ${className}` : "")}>
      <Table {...tableProps} className={style.table} />
      <PaginatedTableIndex
        className={style.index}
        loading={props.loading}
        currentPage={props.currentPage}
        onPageChange={onPageChange}
        disableNextPageButton={disableNextPageButton}
        disablePrevPageButton={disablePrevPageButton}
      />
    </div>
  );
}
