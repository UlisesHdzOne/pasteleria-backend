export type User = {
  id: number;
  name: string;
  age: number;
};
type UserFormProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onAddUser: () => void;
};

const UserForm = ({ user, setUser, onAddUser }: UserFormProps) => {
  return (
    <>
      <p>Nombre : {user.name}</p>
      <p>Edad : {user.age}</p>
      <h1>formulario</h1>
      <input
        type="text"
        value={user.name}
        onChange={(e) =>
          setUser((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) =>
          setUser((prev) => ({
            ...prev,
            age: Number(e.target.value),
          }))
        }
      />

      <button onClick={onAddUser}>Agregar usuario</button>
    </>
  );
};

export default UserForm;
