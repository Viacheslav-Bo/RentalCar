// components/CarItem/CarItem.tsx

import { Car } from "@/src/types/car";
import Link from "next/link";

type Props = {
  item: Car;
};

const CarItem = ({ item }: Props) => {
  return (
    <li>
      <h2>
        {item.brand} {item.model}
      </h2>

      <Link
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
