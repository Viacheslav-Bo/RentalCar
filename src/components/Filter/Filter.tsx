"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./Filters.module.css";

import Select from "react-select";

type Option = { label: string; value: string };

type Props = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

export default function Filter({ brands, price }: Props) {
  const router = useRouter();
  const [brand, setBrand] = useState<Option | null>(null);
  const [rentalPrice, setRentalPrice] = useState<Option | null>(null);
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand.value);
    if (rentalPrice) params.set("price", rentalPrice.value);
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);
    router.push(`/catalog?${params.toString()}`);
  };

  const handleReset = () => {
    setBrand(null);
    setRentalPrice(null);
    setMinMileage("");
    setMaxMileage("");
    router.push("/catalog");
  };

  const brandOptions: Option[] = brands.map((b) => ({ label: b, value: b }));

  const priceOptions: Option[] = Array.from({ length: 6 }, (_, i) => {
    const val = price.min + Math.round((price.max - price.min) / 5) * i;
    return { label: `To $${val}`, value: String(val) };
  });

  const selectClassNames = {
    control: ({ menuIsOpen }: { menuIsOpen: boolean }) =>
      `${css.rsControl} ${menuIsOpen ? css.rsControlOpen : ""}`,
    placeholder: () => css.rsPlaceholder,
    singleValue: () => css.rsSingleValue,
    dropdownIndicator: ({
      selectProps,
    }: {
      selectProps: { menuIsOpen: boolean };
    }) =>
      `${css.rsDropdownIndicator} ${selectProps.menuIsOpen ? css.rsDropdownIndicatorOpen : ""}`,
    menu: () => css.rsMenu,
    menuList: () => css.rsMenuList,
    option: ({
      isSelected,
      isFocused,
    }: {
      isSelected: boolean;
      isFocused: boolean;
    }) =>
      `${css.rsOption} ${isSelected ? css.rsOptionSelected : ""} ${isFocused ? css.rsOptionFocused : ""}`,
  };

  return (
    <div className={css.filters}>
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <Select
          instanceId="brand-select"
          unstyled
          classNames={selectClassNames}
          options={brandOptions}
          value={brand}
          onChange={(opt) => setBrand(opt)}
          placeholder="Choose a brand"
          isClearable
        />
      </div>

      <div className={css.group}>
        <label className={css.label}>Price / hour</label>
        <Select
          instanceId="price-select"
          unstyled
          classNames={selectClassNames}
          options={priceOptions}
          value={rentalPrice}
          onChange={(opt) => setRentalPrice(opt)}
          placeholder="Choose a price"
          isClearable
        />
      </div>

      <div className={css.group}>
        <label className={css.label}>Car mileage / km</label>
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
      <button className={`btn ${css.searchBtn}`} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
