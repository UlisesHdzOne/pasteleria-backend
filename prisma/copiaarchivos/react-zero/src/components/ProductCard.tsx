type ProductCardProps = {
  title: string;
  price: number;
  discount?: number;
};

const ProductCard = ({ title, price, discount }: ProductCardProps) => {
  return (
    <>
      <p>Title : {title}</p>
      {discount !== undefined ? (
        <p>Precio final: ${price - discount}</p>
      ) : (
        <p>Price : ${price}</p>
      )}
    </>
  );
};

export default ProductCard;
