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
  page: number;
  totalPages: number;
}

export type FilterParams = {
  brand?: string;
  brands: string[];
  price: {
    min: number;
    max: number;
  };
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
