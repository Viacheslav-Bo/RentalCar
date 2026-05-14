import { BsGeoAlt } from "react-icons/bs";

import { Car } from "@/src/types/car";

import css from "./CarMainInfo.module.css";

type Props = {
  car: Car;
};

const CarMainInfo = ({ car }: Props) => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>
        {car.brand} {car.model}, {car.year}
      </h1>

      <p className={css.location}>
        <BsGeoAlt className={css.icon} />
        {car.location.address} | Mileage: {car.mileage} km
      </p>

      <p className={css.price}>${car.rentalPrice}</p>

      <p className={css.description}>{car.description}</p>
    </div>
  );
};

export default CarMainInfo;
