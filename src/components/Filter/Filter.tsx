"use client";

import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import css from "./Filter.module.css";

type Props = {
  brands: string[];
};

type Option = {
  value: string;
  label: string;
};

const prices = ["30", "40", "50", "60", "70", "80"];

const Filter = ({ brands }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const brandOptions: Option[] = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOptions: Option[] = prices.map((price) => ({
    value: price,
    label: `To $${price}`,
  }));

  const [brand, setBrand] = useState(searchParams.get("brand") || "");

  const [rentalPrice, setRentalPrice] = useState(
    searchParams.get("rentalPrice") || "",
  );

  const [minMileage, setMinMileage] = useState(
    searchParams.get("minMileage") || "",
  );

  const [maxMileage, setMaxMileage] = useState(
    searchParams.get("maxMileage") || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (rentalPrice) params.set("rentalPrice", rentalPrice);
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);

    const query = params.toString();

    router.push(query ? `/catalog?${query}` : "/catalog");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label className={css.label}>Car brand</label>

        <Select
          options={brandOptions}
          placeholder="Choose a brand"
          value={brand ? { value: brand, label: brand } : null}
          onChange={(option) => setBrand(option?.value || "")}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Price / 1 hour</label>

        <Select
          options={priceOptions}
          placeholder="Choose a price"
          value={
            rentalPrice ?
              {
                value: rentalPrice,
                label: `To $${rentalPrice}`,
              }
            : null
          }
          onChange={(option) => setRentalPrice(option?.value || "")}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Car mileage / km</label>

        <div className={css.mileageInputs}>
          <input
            className={`${css.input} ${css.inputFrom}`}
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />

          <input
            className={`${css.input} ${css.inputTo}`}
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>
      </div>

      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default Filter;
