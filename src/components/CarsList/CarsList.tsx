// components/CarsList/CarsList.tsx

import { Car } from "@/src/lib/api";
import CarItem from "../CarItem/CarItem";

type Props = {
  cars: Car[];
};

const CarsList = ({ cars }: Props) => {
  return (
    <ul>
      {cars.map((car) => (
        <CarItem key={car.id} item={car} />
      ))}
    </ul>
  );
};

export default CarsList;
