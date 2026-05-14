export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  page: number;
  totalPages: number;
}

export type FilterParams = {
  brand?: string;
  rentalPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
  limit?: number;
};

export interface RentalFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment?: string;
}
