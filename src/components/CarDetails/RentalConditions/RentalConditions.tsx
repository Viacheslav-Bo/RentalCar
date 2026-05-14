import { BsCheckCircle } from "react-icons/bs";

import { Car } from "@/src/types/car";

import css from "./RentalConditions.module.css";

type Props = {
  car: Car;
};

const RentalConditions = ({ car }: Props) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Rental Conditions:</h2>

      <ul className={css.list}>
        {car.rentalConditions.map((condition) => (
          <li key={condition} className={css.item}>
            <BsCheckCircle className={css.icon} />

            {condition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalConditions;
