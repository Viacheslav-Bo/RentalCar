// app/catalog/page.tsx

import { getCars } from "@/src/lib/api";
import CarsList from "@/src/components/CarsList/CarsList";

const Cars = async () => {
  const response = await getCars();

  return (
    <section>
      <h1>Catalog</h1>
      {response?.cars?.length > 0 && <CarsList cars={response.cars} />}
    </section>
  );
};

export default Cars;
