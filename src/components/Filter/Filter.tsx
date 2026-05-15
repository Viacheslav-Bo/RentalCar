"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./Filters.module.css";

type Props = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

export default function Filter({ brands, price }: Props) {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (rentalPrice) params.set("price", rentalPrice);
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);
    router.push(`/catalog?${params.toString()}`);
  };

  const priceSteps = Array.from(
    { length: 6 },
    (_, i) => price.min + Math.round((price.max - price.min) / 5) * i,
  );

  return (
    <div className={css.filters}>
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <select
          className={css.select}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={css.group}>
        <label className={css.label}>Price / day</label>
        <select
          className={css.select}
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)}
        >
          <option value="">Any price</option>
          {priceSteps.map((step) => (
            <option key={step} value={step}>
              To ${step}
            </option>
          ))}
        </select>
      </div>

      <div className={css.group}>
        <label className={css.label}>Mileage / km</label>
        <div className={css.mileageRow}>
          <input
            className={css.mileageInput}
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            min={0}
          />
          <input
            className={css.mileageInput}
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            min={0}
          />
        </div>
      </div>

      <button className={`btn ${css.searchBtn}`} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
