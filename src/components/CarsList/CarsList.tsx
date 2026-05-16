"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getCars } from "@/src/lib/api";
import type { FilterParams } from "@/src/types/car";

import CarItem from "../CarItem/CarItem";
import css from "./CarsList.module.css";
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["cars", filters, mileageFilter],
      queryFn: ({ pageParam }) =>
        getCars({ ...filters, page: pageParam, perPage: 12 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const nextPage = Number(lastPage.page) + 1;
        return nextPage <= Number(lastPage.totalPages) ? nextPage : undefined;
      },
      gcTime: 0,
    });

  useEffect(() => {
    if (isError) toast.error("Something went wrong.");
  }, [isError]);

  const allCars = data?.pages.flatMap((page) => page.cars) ?? [];

  const filteredCars = allCars.filter((car) => {
    if (mileageFilter.min !== undefined && car.mileage < mileageFilter.min)
      return false;
    if (mileageFilter.max !== undefined && car.mileage > mileageFilter.max)
      return false;
    return true;
  });

  useEffect(() => {
    const isMileageFilterActive =
      mileageFilter.min !== undefined || mileageFilter.max !== undefined;

    if (!isMileageFilterActive) return;

    if (hasNextPage && !isFetchingNextPage && filteredCars.length < 12) {
      fetchNextPage();
    }
  }, [
    filteredCars.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    mileageFilter,
  ]);

  if (isError) return <p>Something went wrong.</p>;

  if (filteredCars.length === 0 && !isFetchingNextPage && !hasNextPage)
    return <p className={css.empty}>No cars found matching your criteria.</p>;

  return (
    <div className={css.wrapper}>
      <ul className={css.carsList}>
        {filteredCars.map((car, index) => (
          <CarItem key={car.id} car={car} index={index} />
        ))}
      </ul>

      {isFetchingNextPage && (
        <p className={css.loadingText}>Loading more matching cars...</p>
      )}

      {hasNextPage && !isFetchingNextPage && filteredCars.length > 0 && (
        <button
          className={`btn-outline ${css.loadMore}`}
          type="button"
          onClick={() => fetchNextPage()}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default CarsList;
