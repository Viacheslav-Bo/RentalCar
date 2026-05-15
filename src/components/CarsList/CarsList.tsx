// components/CarsList/CarsList.tsx

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getCars } from "@/src/lib/api";
import type { FilterParams } from "@/src/types/car";

import CarItem from "../CarItem/CarItem";
import css from "./CarsList.module.css";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

type MileageFilter = {
  min?: number;
  max?: number;
};

type Props = {
  filters: FilterParams;
  mileageFilter: MileageFilter;
};

const CarsList = ({ filters, mileageFilter }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["cars", filters, mileageFilter],
    queryFn: ({ pageParam }) =>
      getCars({
        ...filters,
        page: pageParam,
        perPage: 12,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = Number(lastPage.page) + 1;

      return nextPage <= Number(lastPage.totalPages) ? nextPage : undefined;
    },
    select: (data) => ({
      ...data,
      cars: data.pages
        .flatMap((page) => page.cars)
        .filter((car) => {
          if (
            mileageFilter.min !== undefined &&
            car.mileage < mileageFilter.min
          )
            return false;
          if (
            mileageFilter.max !== undefined &&
            car.mileage > mileageFilter.max
          )
            return false;
          return true;
        }),
    }),
  });

  const cars = data?.cars ?? [];

  if (isLoading)
    return (
      <div className={css.loaderWrapper}>
        <ClipLoader color="#3470ff" size={50} />
      </div>
    );

  if (isError) return <p>Something went wrong.</p>;

  if (cars.length === 0) return toast.error("Failed to load cars.");

  return (
    <div className={css.wrapper}>
      <ul className={css.carsList}>
        {cars.map((car) => (
          <CarItem key={car.id} car={car} />
        ))}
      </ul>

      {hasNextPage && (
        <button
          className={`btn-outline ${css.loadMore}`}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CarsList;
