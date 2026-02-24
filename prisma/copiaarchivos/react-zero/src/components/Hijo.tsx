type HijoProps = {
  name: string;
  age:number
};

const Hijo = ({ name,age }: HijoProps) => {
  return (
    <>
      <h2>Hola, {name}</h2>
      <p>la edad es: {age}</p>
    </>
  );
};

export default Hijo;
