export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalPages: number;
  page: number;
}

export type CarFiltersResponse = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

export type FilterParams = {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
  perPage?: number;
};

export interface RentalFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment?: string;
}
