import { BsCalendarWeek, BsCarFront, BsFuelPump, BsGear } from "react-icons/bs";

import { Car } from "@/src/types/car";

import css from "./CarSpecifications.module.css";

type Props = {
  car: Car;
};

const CarSpecifications = ({ car }: Props) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Car Specifications:</h2>

      <ul className={css.list}>
        <li className={css.item}>
          <BsCalendarWeek className={css.icon} />
          Year: {car.year}
        </li>

        <li className={css.item}>
          <BsCarFront className={css.icon} />
          Type: {car.type}
        </li>

        <li className={css.item}>
          <BsFuelPump className={css.icon} />
          Fuel Consumption: {car.fuelConsumption}
        </li>

        <li className={css.item}>
          <BsGear className={css.icon} />
          Engine Size: {car.engineSize}
        </li>
      </ul>
    </div>
  );
};

export default CarSpecifications;
