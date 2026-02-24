import { Link } from "react-router-dom";
import type { Driven } from "../../types/vehicle";

type DrivensListProps = {
  drivens: Driven[];
};

const DrivensList = ({ drivens }: DrivensListProps) => {
  return (
    <>
      <ul>
        {drivens.map((item) => (
          <li key={item.id}>
            <Link to={`/driven/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DrivensList;
