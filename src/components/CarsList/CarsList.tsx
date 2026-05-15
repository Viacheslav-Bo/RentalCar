// components/CarsList/CarsList.tsx

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getCars } from "@/src/lib/api";
import type { FilterParams } from "@/src/types/car";

import CarItem from "../CarItem/CarItem";
import css from "./CarsList.module.css";

type Props = {
  filters: FilterParams;
};

const CarsList = ({ filters }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
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
      cars: data.pages.flatMap((page) => page.cars),
    }),
  });

  const cars = data?.cars ?? [];

  if (isLoading) return <p>Loading cars...</p>;

  if (isError) return <p>Something went wrong.</p>;

  if (cars.length === 0) return <p>No cars found.</p>;

  return (
    <>
      <div className={css.wrapper}>
        <ul className={css.carsList}>
          {cars.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </ul>

        {hasNextPage && (
          <button
            className={`btn ${css.loadMore}`}
            type="button"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ?
              "Loading more..."
            : hasNextPage ?
              "Load more"
            : "Nothing more to load"}
          </button>
        )}
      </div>
    </>
  );
};

export default CarsList;
