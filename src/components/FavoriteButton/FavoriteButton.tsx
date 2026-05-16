"use client";
import css from "./FavoriteButton.module.css";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useState } from "react";

export const FavoriteButton = ({ carId }: { carId: string }) => {
  const getFavorites = () => {
    const saved = localStorage.getItem("favorites");
    return saved ? (JSON.parse(saved) as string[]) : [];
  };

  const [active, setActive] = useState(() => getFavorites().includes(carId));

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const prev = getFavorites();
    const next =
      prev.includes(carId) ?
        prev.filter((id) => id !== carId)
      : [...prev, carId];
    localStorage.setItem("favorites", JSON.stringify(next));
    setActive(!active);
  };

  return (
    <button
      className={css.btn}
      onClick={toggleFavorite}
      aria-label={active ? "Видалити з обраного" : "Додати до обраного"}
    >
      {active ?
        <BsFillHeartFill size={20} className={css.iconActive} />
      : <BsHeart size={20} className={css.iconDefault} />}
    </button>
  );
};
