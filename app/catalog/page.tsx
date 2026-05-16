import { getFilters } from "@/src/lib/api";
import CarsList from "@/src/components/CarsList/CarsList";
import Filter from "@/src/components/Filter/Filter";
import type { FilterParams } from "@/src/types/car";

type Props = {
  searchParams: Promise<{
    brand?: string;
    price?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};

const Cars = async ({ searchParams }: Props) => {
  const [raw, { brands, price }] = await Promise.all([
    searchParams,
    getFilters(),
  ]);

  const filters: FilterParams = {
    ...(raw.brand && { brand: raw.brand }),
    ...(raw.price && { price: Number(raw.price) }),
    ...(raw.minMileage && { minMileage: Number(raw.minMileage) }),
    ...(raw.maxMileage && { maxMileage: Number(raw.maxMileage) }),
    ...(raw.maxMileage && {
      minMileage: Number(raw.minMileage) || 0,
      maxMileage: Number(raw.maxMileage),
    }),
  };

  return (
    <section className="container">
      <h1 className="visually-hidden">Car Rental Catalog</h1>
      <Filter brands={brands} price={price} />
      <CarsList filters={filters} />
    </section>
  );
};

export default Cars;
