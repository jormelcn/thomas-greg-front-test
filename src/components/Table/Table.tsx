import { ReactNode, useMemo, useState } from "react";
import { useTable } from "react-table";
import { AreaLoading } from "../AreaLoading";
import { ResizableWidth } from "../ResizableWidth";
import style from "./Table.module.css";

export interface ITableRow {
  id: string;
}

export interface ITableColumn<T extends ITableRow> {
  Header: ReactNode;
  accessor: keyof T;
  width: number;
  cellWidth?: number;
  resizeDisabled?: boolean;
}

export interface ITableCellIndex<T extends ITableRow> {
  rowId?: string;
  columnAccessor?: keyof T;
}

export interface ITableHighlightedRow {
  rowId: string;
  color: "primary" | "secondary" | "warning";
}

export interface ITableProps<T extends ITableRow> {
  className?: string;
  columns: ITableColumn<T>[];
  values: T[];
  selectedCell?: ITableCellIndex<T>;
  highlightedRows?: ITableHighlightedRow[];
  loading?: boolean;
  onColumnsChange: (columns: ITableColumn<T>[]) => void;
  onCellClick?: (cellIndex: ITableCellIndex<T>) => void;
}

export function Table<T extends ITableRow>(props: ITableProps<T>) {
  const [horizontalScroll, setHorizontalScroll] = useState(0);
  const tableInstance = useTable({
    columns: props.columns as [],
    data: props.values as [],
  });

  const indexedHighlightedRows = useMemo(() => {
    return new Map((props.highlightedRows ?? []).map((x) => [x.rowId, x]));
  }, [props.highlightedRows]);

  const onCellClick = (cellIndex: ITableCellIndex<T>) => {
    if (props.onCellClick) props.onCellClick(cellIndex);
  };

  const onColumnWidthChange = (width: number, column: ITableColumn<T>) => {
    if (column.resizeDisabled) return;
    props.onColumnsChange(
      props.columns.map((x) => {
        if (x === column) {
          return { ...x, width };
        }
        return x;
      })
    );
  };

  const onCellWidthChange = (column: ITableColumn<T>) => {
    props.onColumnsChange(
      props.columns.map((x) => {
        if (x === column) {
          return { ...x, cellWidth: x.width };
        }
        return x;
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onBodyScroll = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setHorizontalScroll(evt.target.scrollLeft);
  };

  return (
    <div
      className={style.root + (props.className ? ` ${props.className}` : "")}
    >
      <div className={style.head} style={{ left: `-${horizontalScroll}px` }}>
        {tableInstance.headerGroups.map((headerGroup) => {
          const { key, ...__props } = headerGroup.getHeaderGroupProps();
          return (
            <div key={key} className={style.row} {...__props}>
              {headerGroup.headers.map((column, j) => {
                const {key, ...__props} = column.getHeaderProps();
                return (
                  <ResizableWidth
                    key={key}
                    className={style.headCellResizableContainer}
                    width={props.columns[j].width}
                    onWidthChange={(width) =>
                      onColumnWidthChange(width, props.columns[j])
                    }
                    onChangeStop={() => onCellWidthChange(props.columns[j])}
                    disabled={props.columns[j].resizeDisabled}
                  >
                    <div
                      {...__props}
                      style={{ width: "100%", height: "100%" }}
                      className={style.headCell}
                    >
                      {column.render("Header")}
                    </div>
                  </ResizableWidth>
                );
              })}
            </div>
          );
        })}
      </div>
      <AreaLoading loading={props.loading} className={style.areaLoading} />
      <div
        onScroll={onBodyScroll}
        className={style.body}
        {...tableInstance.getTableBodyProps()}
      >
        {tableInstance.rows.map((row) => {
          tableInstance.prepareRow(row);
          const rowId = (row.original as ITableRow).id;
          const highlight = indexedHighlightedRows.get(rowId);
          const rowClasses = [
            style.row,
            props.selectedCell?.rowId === rowId && style.selected,
            highlight && style[`${highlight.color}Highlighted`],
          ].filter((x) => x);
          const { key, ...__props } = row.getRowProps();
          return (
            <div key={key} className={rowClasses.join(" ")} {...__props}>
              {row.cells.map((cell, j) => {
                const cellWidth: number =
                  props.columns[j].cellWidth ?? props.columns[j].width;
                const { key, ...__props } = cell.getCellProps();
                return (
                  <div
                    key={key}
                    {...__props}
                    onClick={() =>
                      onCellClick({
                        rowId: (row.original as ITableRow).id,
                        columnAccessor: props.columns[j].accessor,
                      })
                    }
                    style={{
                      width: `${cellWidth}px`,
                      minWidth: `${cellWidth}px`,
                      maxWidth: `${cellWidth}px`,
                    }}
                  >
                    <div className={style.cell}>{cell.render("Cell")}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
