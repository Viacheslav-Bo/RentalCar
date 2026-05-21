"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./Filters.module.css";

import Select from "react-select";

import { RiResetLeftFill } from "react-icons/ri";

const selectComponents = {
  IndicatorSeparator: () => null,
};

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

    if (brand?.value) params.set("brand", brand.value);
    if (rentalPrice?.value) params.set("price", rentalPrice.value);
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

  const brandOptions: Option[] = [
    { label: "Choose a brand", value: "" },
    ...brands.map((b) => ({ label: b, value: b })),
  ];

  const priceOptions: Option[] = [
    { label: "Choose a price", value: "" },
    ...Array.from({ length: 6 }, (_, i) => {
      const val = price.min + Math.round((price.max - price.min) / 5) * i;
      return { label: `To $${val}`, value: String(val) };
    }),
  ];

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
      [
        css.rsOption,
        isSelected ? css.rsOptionSelected : "",
        !isSelected && isFocused ? css.rsOptionFocused : "",
      ].join(" "),
  };
  const brandClassNames = {
    ...selectClassNames,
    control: ({ menuIsOpen }: { menuIsOpen: boolean }) =>
      `${css.rsControl} ${css.rsControlBrand} ${menuIsOpen ? css.rsControlOpen : ""}`,
  };

  const priceClassNames = {
    ...selectClassNames,
    control: ({ menuIsOpen }: { menuIsOpen: boolean }) =>
      `${css.rsControl} ${css.rsControlPrice} ${menuIsOpen ? css.rsControlOpen : ""}`,
  };

  return (
    <div className={css.filters}>
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <Select
          classNames={brandClassNames}
          components={selectComponents}
          instanceId="brand-select"
          unstyled
          options={brandOptions}
          value={brand}
          onChange={(opt) => setBrand(opt?.value ? opt : null)}
          placeholder="Choose a brand"
          styles={{
            menuList: (base) => ({
              ...base,
              scrollbarWidth: "thin",
              scrollbarColor: "#D9D9D9 transparent",
              "::-webkit-scrollbar": {
                width: "8px",
              },
              "::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#D9D9D9",
                borderRadius: "10px",
                minHeight: "128px",
              },
            }),
          }}
        />
      </div>

      <div className={css.group}>
        <label className={css.label}>Price / hour</label>
        <Select
          classNames={priceClassNames}
          components={selectComponents}
          instanceId="price-select"
          unstyled
          options={priceOptions}
          value={rentalPrice}
          onChange={(opt) => setRentalPrice(opt?.value ? opt : null)}
          placeholder="Choose a price"
        />
      </div>

      <div className={css.group}>
        <label className={css.label}>Car mileage / km</label>
        <fieldset className={css.mileageRow}>
          <div className={css.mileageHalf}>
            <span className={css.prefix}>From</span>
            <input
              className={css.mileageInput}
              type="text"
              inputMode="numeric"
              placeholder=" "
              value={
                minMileage ? Number(minMileage).toLocaleString("en-US") : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                setMinMileage(raw);
              }}
            />
          </div>
          <div className={css.mileageHalf}>
            <span className={css.prefix}>To</span>
            <input
              className={css.mileageInput}
              type="text"
              inputMode="numeric"
              placeholder=" "
              value={
                maxMileage ? Number(maxMileage).toLocaleString("en-US") : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                setMaxMileage(raw);
              }}
            />
          </div>
        </fieldset>
      </div>

      <button className={`btn ${css.searchBtn}`} onClick={handleSearch}>
        Search
      </button>
      {(brand || rentalPrice || minMileage || maxMileage) && (
        <button
          className="resetBtn"
          onClick={handleReset}
          style={{
            visibility:
              brand || rentalPrice || minMileage || maxMileage ?
                "visible"
              : "hidden",
          }}
        >
          <span className={css.resetIcon}>
            <RiResetLeftFill />
          </span>
          <span className={css.resetText}>Reset</span>
        </button>
      )}
    </div>
  );
}
