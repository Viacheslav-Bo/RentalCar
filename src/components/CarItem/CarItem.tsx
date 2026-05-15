// components/CarItem/CarItem.tsx

import { Car } from "@/src/types/car";
import Link from "next/link";
import Image from "next/image";
import css from "../CarItem/CarItem.module.css";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";

type Props = {
  car: Car;
};

const CarItem = ({ car }: Props) => {
  return (
    <li className={css.carItem}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={480}
        />
        <FavoriteButton carId={car.id} />
      </div>

      <div className={css.itemInfo}>
        <h2 className={css.title}>
          {car.brand} <span>{car.model}, </span>
          {car.year}
        </h2>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <ul className={`${css.infoList} ${css.infoListMain}`}>
        <li>{car.location?.city}</li>
        <li>{car.location?.country}</li>
        <li>{car.rentalCompany}</li>
      </ul>

      <ul className={`${css.infoList} ${css.infoListSecondary}`}>
        <li>{car.type}</li>
        <li>{car.mileage} km</li>
      </ul>

      <Link
        className={`btn ${css.button}`}
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </Link>
    </li>
  );
};

export default CarItem;
