type CounterButtonProps = {
    onIncrement:()=>void;
}

const CounterButton = ({onIncrement}:CounterButtonProps) => {
  return (
    <>
    <button onClick={onIncrement}>incrementar</button>
    </>
  )
}

export default CounterButton