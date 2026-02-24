export type Driven = {
  id: number;
  name: string;
};

export type Vehicle = {
  id: number;
  name: string;
  driven?: Driven;
};

export type VehicleInput = {
  name: string;
  driven?: {
    name: string;
  };
};

export type VehiclesResponse = {
  data: Vehicle[];
};
