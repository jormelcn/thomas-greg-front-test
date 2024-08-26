import { ProductForAdminDTO } from "src/api/dtos";
import { formatMoney } from "src/format/formatMoney";
import style from "./ProductDetailedInfo.module.css";

export interface ProductDetailedInfoProps {
  product: ProductForAdminDTO;
}

export function ProductDetailedInfo({ product }: ProductDetailedInfoProps) {
  return (
    <div className={style.root}>
      <h2>Detalle del producto</h2>
      <div>
        <h3>ID</h3>
        <p>{product.id}</p>
      </div>
      <div>
        <h3>Nombre</h3>
        <p>{product.name}</p>
      </div>
      <div>
        <h3>Precio Unitario</h3>
        <p>{formatMoney(product.unitPrice!)}</p>
      </div>
      <div>
        <h3>Moneda</h3>
        <p>{product.unitPrice!.currency}</p>
      </div>
    </div>
  );
}
