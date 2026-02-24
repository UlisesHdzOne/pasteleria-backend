import { Link, useSearchParams } from "react-router-dom";
import type { Driven } from "../../../types/vehicle";

type DrivensListDosProps = {
  drivens: Driven[];
};

const DrivensListDos = ({ drivens }: DrivensListDosProps) => {
    const [searchParams] = useSearchParams();

  return (
       <ul>
      {drivens.map((item) => (
        <li key={item.id}>
          <Link to={`${item.id}?${searchParams.toString()}`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DrivensListDos;
