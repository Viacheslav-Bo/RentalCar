// app/catalog/[id]/page.tsx
import Image from "next/image";
import { getSingleCar } from "@/src/lib/api";
// import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const CarDetails = async ({ params }: Props) => {
  const { id } = await params;
  const car = await getSingleCar(id);

  //   if (!car) {
  //     notFound();
  //   }

  return (
    <main>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={640}
        height={480}
        loading="eager"
      />

      <h1>
        {car.brand} {car.model}, {car.year}
      </h1>

      <p>{car.description}</p>

      <ul>
        <li>Price: ${car.rentalPrice}</li>
        <li>Type: {car.type}</li>
        <li>Fuel consumption: {car.fuelConsumption}</li>
        <li>Engine size: {car.engineSize}</li>
        <li>Mileage: {car.mileage}</li>
        <li>Company: {car.rentalCompany}</li>
        <li>Address: {car.address}</li>
      </ul>

      <h2>Accessories</h2>
      <ul>
        {car.accessories.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Functionalities</h2>
      <ul>
        {car.functionalities.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Rental conditions</h2>
      <ul>
        {car.rentalConditions.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
};

export default CarDetails;
