"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [visibleCount, setVisibleCount] = useState(12);
  const [prevFiltersKey, setPrevFiltersKey] = useState(
    JSON.stringify({ filters, mileageFilter }),
  );

  const filtersKey = JSON.stringify({ filters, mileageFilter });

  if (prevFiltersKey !== filtersKey) {
    setPrevFiltersKey(filtersKey);
    setVisibleCount(12);
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["cars", filters],
      queryFn: ({ pageParam }) =>
        getCars({ ...filters, page: pageParam, perPage: 12 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const nextPage = Number(lastPage.page) + 1;
        return nextPage <= Number(lastPage.totalPages) ? nextPage : undefined;
      },
    });

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const visibleCars = filteredCars.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCars.length;

  if (isError) return <p>Something went wrong.</p>;

  if (filteredCars.length === 0)
    return <p className={css.empty}>No cars found matching your criteria.</p>;

  return (
    <div className={css.wrapper}>
      <ul className={css.carsList}>
        {visibleCars.map((car, index) => (
          <CarItem key={car.id} car={car} index={index} />
        ))}
      </ul>

      {(hasMore || isFetchingNextPage) && (
        <button
          className={`btn-outline ${css.loadMore}`}
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 12)}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CarsList;
