// components/CarsList/CarsList.tsx

import { Car } from "..//..//types/car";
import CarItem from "../CarItem/CarItem";
import css from "../CarsList/CarsList.module.css";

type Props = {
  cars: Car[];
};

const CarsList = ({ cars }: Props) => {
  return (
    <ul className={css.carsList}>
      {cars.map((car) => (
        <CarItem key={car.id} item={car} />
      ))}
    </ul>
  );
};

export default CarsList;
