type CounterProps = {
  value: number;
  onIncrement: () => void;
};

const Counter = ({ value, onIncrement }: CounterProps) => {
  return (
    <>
      <p>{value}</p>
      <button onClick={onIncrement}> + </button>
    </>
  );
};

export default Counter;
