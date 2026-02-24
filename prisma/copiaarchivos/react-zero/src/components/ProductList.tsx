import type { Product } from "../types/types";
import ProductDetail from "./ProductDetail";

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <ul>
        {products.map((item, index) => (
          <li key={index}>
            <ProductDetail product={item}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
