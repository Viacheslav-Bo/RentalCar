// components/CarItem/CarItem.tsx

import { Car } from "@/src/types/car";
import Link from "next/link";
import Image from "next/image";
import css from "../CarItem/CarItem.module.css";

type Props = {
  item: Car;
};

const CarItem = ({ item }: Props) => {
  return (
    <li className={css.carItem}>
      <Image
        className={css.image}
        src={item.img}
        alt={`${item.brand} ${item.model}`}
        width={640}
        height={480}
      />

      <div className={css.itemInfo}>
        <h2 className={css.title}>
          {item.brand} <span>{item.model}, </span>
          {item.year}
        </h2>
        <p className={css.price}>${item.rentalPrice}</p>
      </div>

      <ul className={`${css.infoList} ${css.infoListMain}`}>
        <li>{item.address.split(", ")[1]}</li>
        <li>{item.address.split(", ")[2]}</li>
        <li>{item.rentalCompany}</li>
      </ul>

      <ul className={`${css.infoList} ${css.infoListSecondary}`}>
        <li>{item.type}</li>
        <li>{item.mileage} km</li>
      </ul>

      <Link
        className={`btn ${css.button}`}
        href={`/catalog/${item.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </Link>
    </li>
  );
};

export default CarItem;
