// src/lib/api.ts

import axios from "axios";
import {
  CarsResponse,
  Car,
  FilterParams,
  CarFiltersResponse,
} from "../types/car";
import { BookingData } from "../types/booking";

const studyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getCars = async (filters: FilterParams) => {
  const res = await studyApi.get<CarsResponse>("/cars", { params: filters });
  return res.data;
};

export const getSingleCar = async (id: string) => {
  const res = await studyApi.get<Car>(`/cars/${id}`);
  return res.data;
};

export const bookingRequest = async (carId: string, data: BookingData) => {
  const res = await studyApi.post(`/cars/${carId}/booking-requests`, data);

  return res.data;
};

export const getFilters = async (): Promise<CarFiltersResponse> => {
  const res = await studyApi.get<CarFiltersResponse>("/cars/filters");
  return res.data;
};

export const getAllCars = async (filters: FilterParams) => {
  const firstPage = await studyApi.get<CarsResponse>("/cars", {
    params: { ...filters, page: 1, perPage: 12 },
  });

  const { totalPages } = firstPage.data;

  if (totalPages <= 1) return firstPage.data.cars;

  const restPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      studyApi.get<CarsResponse>("/cars", {
        params: { ...filters, page: i + 2, perPage: 12 },
      }),
    ),
  );

  return [...firstPage.data.cars, ...restPages.flatMap((res) => res.data.cars)];
};
