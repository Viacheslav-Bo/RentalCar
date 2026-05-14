import { BsCheckCircle } from "react-icons/bs";
import { Car } from "@/src/types/car";

import css from "./Accessories.module.css";

type Props = {
  car: Car;
};

const Accessories = ({ car }: Props) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Accessories and functionalities:</h2>

      <ul className={css.list}>
        {[...car.accessories, ...car.functionalities].map((item) => (
          <li key={item} className={css.item}>
            <BsCheckCircle className={css.icon} />

            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accessories;
