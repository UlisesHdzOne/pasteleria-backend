import { useState } from "react";

const Contador = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <p>contador {count}</p>
      <button onClick={() => setCount(prev =>prev + 1)}>Sumar</button>
      <button onClick={() => setCount(prev =>prev - 1)} disabled={count === 0}>
        Restar
      </button>
    </>
  );
};

export default Contador;
