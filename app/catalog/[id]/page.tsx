import Image from "next/image";
import { notFound } from "next/navigation";

import { getSingleCar } from "@/src/lib/api";
import Form from "@/src/components/Form/Form";
import CarMainInfo from "@/src/components/CarDetails/CarMainInfo/CarMainInfo";
import RentalConditions from "@/src/components/CarDetails/RentalConditions/RentalConditions";
import CarSpecifications from "@/src/components/CarDetails/CarSpecifications/CarSpecifications";
import Accessories from "@/src/components/CarDetails/Accessories/Accessories";

import css from "./page.module.css";

type Props = {
  params: Promise<{ id: string }>;
};

const CarDetails = async ({ params }: Props) => {
  const { id } = await params;
  const car = await getSingleCar(id);

  if (!car) {
    notFound();
  }

  return (
    <main className={` container ${css.containerId} ${css.wrapper}`}>
      <div className={css.leftColumn}>
        <Image
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          priority
        />
        <div className={css.desctopForm}>
          <Form carId={car.id} />
        </div>
      </div>

      <div className={css.rightColumn}>
        <div className={css.mainInfo}>
          <CarMainInfo car={car} />
        </div>
        <div className={css.section}>
          <RentalConditions car={car} />
        </div>
        <div className={css.section}>
          <CarSpecifications car={car} />
        </div>
        <div className={css.section}>
          <Accessories car={car} />
        </div>
      </div>

      <div className={css.mobileForm}>
        <Form carId={car.id} />
      </div>
    </main>
  );
};

export default CarDetails;
