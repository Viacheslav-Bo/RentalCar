// app/catalog/[id]/page.tsx
import Image from "next/image";
import { getSingleCar } from "@/src/lib/api";
import { notFound } from "next/navigation";
import css from "./page.module.css";
import {
  BsCheckCircle,
  BsCarFront,
  BsCalendarWeek,
  BsFuelPump,
  BsGear,
  BsGeoAlt,
} from "react-icons/bs";
import Form from "@/src/components/Form/Form";

type Props = {
  params: Promise<{ id: string }>;
};

const CarDetails = async ({ params }: Props) => {
  const { id } = await params;
  const car = await getSingleCar(id);
  console.log(car);

  if (!car) {
    notFound();
  }

  const [, city, country] = car.address.split(", ");

  return (
    <main>
      <Image
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={640}
        height={480}
        priority
      />
      <div>
        <h1>
          {car.brand} {car.model}, {car.year} {car.id}
        </h1>
        <p>
          <BsGeoAlt />
          {city}, {country} | Mileage: {car.mileage} km
        </p>

        <p>${car.rentalPrice}</p>

        <p>{car.description}</p>
      </div>
      <div>
        <h2>Rental Conditions: </h2>
        <ul>
          {car.rentalConditions.map((condition: string) => (
            <li key={condition}>
              <BsCheckCircle />
              {condition}{" "}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Car Specifications:</h2>
        <ul>
          <li>
            <BsCalendarWeek />
            Year : {car.year}
          </li>
          <li>
            <BsCarFront />
            Type : {car.type}
          </li>
          <li>
            <BsFuelPump />
            Fuel Consumption : {car.fuelConsumption}
          </li>
          <li>
            <BsGear />
            Engine Size : {car.engineSize}
          </li>
        </ul>
      </div>
      <div>
        <h2>Accessories and functionalities:</h2>
        <ul>
          {[...car.accessories, ...car.functionalities].map((item: string) => (
            <li key={item}>
              {" "}
              <BsCheckCircle />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Form carId={car.id} />
    </main>
  );
};

export default CarDetails;
