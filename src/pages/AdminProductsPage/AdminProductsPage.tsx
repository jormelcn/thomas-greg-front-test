import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchProducts } from "src/api/useSearchProducts";
import { useStoreService } from "src/api/useStoreService";
import { AnimatedPanel } from "src/components/AnimatedPanel";
import { Button } from "src/components/Button";
import { PaginatedTable } from "src/components/PaginatedTable";
import { ProductDetailedInfo } from "src/components/ProductDetailedInfo";
import {
  ProductForm,
  ProductFormValue,
} from "src/components/ProductForm/ProductForm";
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
  const storeService = useStoreService();
  const [openInfoPanel, setOpenInfoPanel] = useState(false);
  const [openFormPanel, setOpenFormPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  // const [selectedItem, setSelectedItem] = useState<
  //   ProductForAdminDTO | undefined
  // >();
  const [searchParams] = useSearchParams();
  const { data, error, isValidating, mutate } = useSearchProducts({
    page: parseInt(searchParams.get("page") ?? "0"),
  });

  useEffect(() => {
    if (!error) return;
    if (error.status == 403) {
      alert("Acceso no autorizado");
    } else {
      alert("Lo sentimos, encontramos un inesperado en nuestros servicios");
    }
  }, [error]);

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

  const onEditClick = useCallback(
    (productId: string) => {
      const selectedItem = data?.content!.find((x) => x.id === productId);
      setSelectedItemId(selectedItem?.id);
      if (selectedItem) {
        setOpenFormPanel(true);
        setOpenInfoPanel(true);
      }
    },
    [data?.content]
  );

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
            <Button variant="text" onClick={() => onEditClick(x.id!)}>
              <MdEditSquare />
            </Button>
          </span>
        ),
      })) ?? [],
    [data?.content, onEditClick]
  );

  const selectedItem = useMemo(() => {
    return data?.content!.find((x) => x.id === selectedItemId);
  }, [selectedItemId, data?.content]);

  const onCellClick = (cellIndex: ITableCellIndex<ProductRow>) => {
    setSelectedCell(cellIndex);
    const selectedItem = data?.content!.find((x) => x.id === cellIndex.rowId);
    setSelectedItemId(selectedItem?.id);
    setOpenInfoPanel(true);
  };

  const onPageChange = (page: number) => {
    const url = new URL(location.href);
    url.searchParams.set("page", page.toString());
    navigate({ search: url.search.substring(1) });
  };

  const initFormValue = useMemo<ProductFormValue | undefined>(() => {
    if (!selectedItem) return undefined;
    return {
      name: selectedItem.name!,
      unitPrice: selectedItem.unitPrice!.amount.toString(),
      currency: selectedItem.unitPrice!.currency,
    };
  }, [selectedItem]);

  const callUpdateApi = async (value: ProductFormValue) => {
    if (!selectedItem) return;
    setLoading(true);
    const result = await storeService.updateProduct({
      id: selectedItem!.id,
      name: value.name,
      unitPrice: {
        amount: parseFloat(value.unitPrice),
        currency: value.currency,
      },
    });
    setLoading(false);
    if (result.isSuccess) {
      mutate();
      alert("Producto guardado");
    } else if (result.status == 403) {
      alert("Acceso no autorizado");
    } else {
      alert("Lo sentimos, encontramos un inesperado en nuestros servicios");
    }
  };

  const onFormSubmit = (value: ProductFormValue) => {
    if (selectedItem) {
      callUpdateApi(value);
    }
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
        side="left"
        onClose={() => setOpenInfoPanel(false)}
      >
        <div className={style.panelContent}>
          {selectedItem && <ProductDetailedInfo product={selectedItem} />}
        </div>
      </AnimatedPanel>
      <AnimatedPanel
        open={openFormPanel}
        side="right"
        onClose={() => setOpenFormPanel(false)}
      >
        <div className={style.panelContent}>
          <ProductForm
            onValidSubmit={onFormSubmit}
            key={selectedItem?.id}
            initValue={initFormValue}
            loading={loading}
          />
        </div>
      </AnimatedPanel>
    </div>
  );
}
