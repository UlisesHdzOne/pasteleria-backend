type UserProps = {
  name: string;
  age: number;
};
const UserCard = ({ name, age }: UserProps) => {
  return (
    <>
      <p>
        Hola, soy {name} y tengo {age} años
      </p>
    </>
  );
};

export default UserCard;
