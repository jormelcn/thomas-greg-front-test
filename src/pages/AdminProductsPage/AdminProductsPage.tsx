import { ReactNode, useMemo, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchProducts } from "src/api/useSearchProducts";
import { AnimatedPanel } from "src/components/AnimatedPanel";
import { Button } from "src/components/Button";
import { PaginatedTable } from "src/components/PaginatedTable";
import { ITableCellIndex, ITableColumn } from "src/components/Table";
import { formatMoney } from "src/format/formatMoney";
import isoStringDateToHumanDateTime from "src/format/isoStringDateToHumanDateTime";
import style from "./AdminProductsPage.module.css";

export interface ProductRow {
  id: string;
  name: string;
  unitPrice: string;
  statusColor: ReactNode;
  creationTime: ReactNode;
  actions: ReactNode;
}

export function AdminProductPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, isValidating } = useSearchProducts({
    page: parseInt(searchParams.get("page") ?? "0"),
  });
  const [openInfoPanel, setOpenInfoPanel] = useState(false);

  // const callSearchApi = useCallback(async () => {
  //   const result = await storeService.searchProducts({
  //     page: 0,
  //   });

  //   if (result.isSuccess) {
  //     console.log(result);
  //   } else if (result.status == 403) {
  //     alert("Acceso no autorizado");
  //   } else {
  //     alert("Lo sentimos, encontramos un inesperado en nuestros servicios");
  //   }
  // }, [storeService]);

  // useEffect(() => {
  //   callSearchApi();
  // }, [callSearchApi]);

  const [selectedCell, setSelectedCell] = useState<
    undefined | ITableCellIndex<ProductRow>
  >();

  const [columns, setColumns] = useState<ITableColumn<ProductRow>[]>([
    {
      Header: "",
      accessor: "actions",
      width: 60,
      cellWidth: 60,
      resizeDisabled: true,
    },
    {
      Header: "",
      accessor: "statusColor",
      width: 18,
      cellWidth: 18,
      resizeDisabled: true,
    },

    {
      Header: "Creación",
      accessor: "creationTime",
      width: 200,
      cellWidth: 200,
    },
    { Header: "Nombre", accessor: "name", width: 200, cellWidth: 200 },
    {
      Header: "Precio unitario",
      accessor: "unitPrice",
      width: 200,
      cellWidth: 200,
    },
  ]);

  const values = useMemo<ProductRow[]>(
    () =>
      data?.content!.map((x) => ({
        id: x.id!,
        name: x.name!,
        unitPrice: formatMoney(x.unitPrice!),
        statusColor: <div></div>,
        creationTime: isoStringDateToHumanDateTime(x.createdDate!),
        actions: (
          <span
            className={style.actionButtonsContainer}
            onClick={(evt) => evt.stopPropagation()}
          >
            <Button variant="text" onClick={() => {}}>
              <MdEditSquare />
            </Button>
          </span>
        ),
      })) ?? [],
    [data?.content]
  );

  const onCellClick = (cellIndex: ITableCellIndex<ProductRow>) => {
    setSelectedCell(cellIndex);
    // setSelectedJobOffer(jobOffers?.find(x => x.id === cellIndex.rowId));
    setOpenInfoPanel(true);
  };

  const onPageChange = (page: number) => {
    const url = new URL(location.href);
    url.searchParams.set("page", page.toString());
    navigate({ search: url.search.substring(1) });
  };

  return (
    <div className={style.root}>
      <header></header>
      <main className={style.tableContainer}>
        <PaginatedTable
          disableNextPageButton={data?.last}
          loading={data == null && isValidating}
          onPageChange={onPageChange}
          currentPage={data?.number ?? 0}
          className={style.table}
          columns={columns}
          values={values}
          onColumnsChange={setColumns}
          selectedCell={selectedCell}
          onCellClick={onCellClick}
        />
      </main>
      <AnimatedPanel
        open={openInfoPanel}
        onClose={() => setOpenInfoPanel(false)}
      >
        <div></div>
        {/* {selectedJobOffer != null
          ? (
            <div style={{ padding: "1rem 1rem" }} >
              <h1 style={{ color: "var(--color-primary)", textAlign: "center" }}>
                Oferta laboral
              </h1>
              <JobOfferDetail jobOffer={selectedJobOffer} />
            </div>
          ) : (
            <></>
          )} */}
      </AnimatedPanel>
    </div>
  );
}
