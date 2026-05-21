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
