import type { Product } from "../types/types";

type ProductDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { title, price, discount } = product;

  return (
    <>
      <h1>Nombre : {title}</h1>
      {discount ? (
        <div>
          <p>si hay desucuento</p>
          <p>precio final : {price - discount}</p>
        </div>
      ) : (
        <div>
          <p>No hay descuento</p>
          <p>{price}</p>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
