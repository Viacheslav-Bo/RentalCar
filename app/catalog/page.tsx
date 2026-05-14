// app/catalog/page.tsx

import { getCars } from "@/src/lib/api";
import CarsList from "@/src/components/CarsList/CarsList";

import Filter from "@/src/components/Filter/Filter";

import type { CarsFilters } from "@/src/types/car";

type Props = {
  searchParams: Promise<CarsFilters>;
};

const Cars = async ({ searchParams }: Props) => {
  const filters = await searchParams;

  const allCarsResponse = await getCars({ limit: 100 });

  const uniqueBrands = [
    ...new Set(allCarsResponse.cars.map((car) => car.brand)),
  ];

  return (
    <section>
      <h1>Catalog</h1>
      <Filter brands={uniqueBrands} />
      <CarsList filters={filters} />
    </section>
  );
};

export default Cars;
