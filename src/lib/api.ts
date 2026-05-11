// src/lib/api.ts

import axios from "axios";
import { CarsResponse, Car } from "../types/car";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const getCars = async () => {
  const res = await axios.get<CarsResponse>("/cars");
  return res.data;
};

export const getSingleCar = async (id: string) => {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
};
