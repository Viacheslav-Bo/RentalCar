"use client";
import { useFavorites } from "@/src/hooks/useFavorites";
import css from "./FavoriteButton.module.css";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

export const FavoriteButton = ({ carId }: { carId: string }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(carId);

  return (
    <button
      className={css.btn}
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(carId);
      }}
      aria-label={active ? "Видалити з обраного" : "Додати до обраного"}
    >
      {active ?
        <BsFillHeartFill size={20} className={css.iconActive} />
      : <BsHeart size={20} className={css.iconDefault} />}
    </button>
  );
};
