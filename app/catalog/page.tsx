import { getFilters } from "@/src/lib/api";
import CarsList from "@/src/components/CarsList/CarsList";
import Filter from "@/src/components/Filter/Filter";
import type { FilterParams } from "@/src/types/car";

type Props = {
  searchParams: Promise<
    FilterParams & { minMileage?: string; maxMileage?: string }
  >;
};

const Cars = async ({ searchParams }: Props) => {
  const raw = await searchParams;
  const filters: FilterParams = {
    ...(raw.brand && { brand: raw.brand }),
    ...(raw.price && { price: Number(raw.price) }),
  };

  const mileageFilter = {
    min: raw.minMileage ? Number(raw.minMileage) : undefined,
    max: raw.maxMileage ? Number(raw.maxMileage) : undefined,
  };

  const { brands, price } = await getFilters();

  return (
    <section>
      <h1>Catalog</h1>
      <Filter brands={brands} price={price} />
      <CarsList filters={filters} mileageFilter={mileageFilter} />
    </section>
  );
};

export default Cars;
