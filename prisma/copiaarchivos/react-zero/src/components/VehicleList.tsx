import type { Vehicle } from "../types/vehicle";


type Props = {
  vehicles: Vehicle[];
};

function VehicleList({ vehicles }: Props) {
  return (
    <ul>
      {vehicles.map((v) => (
        <li key={v.id}>
          {v.name}
          {v.driven && ` - ${v.driven.name}`}
        </li>
      ))}
    </ul>
  );
}

export default VehicleList;
