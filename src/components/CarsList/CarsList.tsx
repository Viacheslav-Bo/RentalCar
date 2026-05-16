"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
    queryFn: ({ pageParam = 1 }) =>
      getCars({
        ...filters,
        page: pageParam,
        perPage: 12,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      return allPages.length < lastPage.totalPages ?
          allPages.length + 1
        : undefined;
    },
  });

  useEffect(() => {
    if (isError) toast.error("Something went wrong.");
  }, [isError]);

  const cars = data?.pages.flatMap((p) => p.cars) ?? [];

  if (isError) return <p>Something went wrong.</p>;
  if (!isLoading && cars.length === 0) {
    return <p className={css.empty}>No cars found</p>;
  }

  return (
    <div className={css.wrapper}>
      <ul className={css.carsList}>
        {cars.map((car) => (
          <CarItem key={car.id} car={car} />
        ))}
      </ul>

      {isFetchingNextPage && <p className={css.loadingText}>Loading...</p>}

      {hasNextPage && (
        <button
          className={`btn-outline ${css.loadMore}`}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CarsList;
