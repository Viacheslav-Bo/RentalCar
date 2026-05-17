"use client";
import css from "./FavoriteButton.module.css";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useFavoritesStore } from "@/src/store/useFavoritesStore";

export const FavoriteButton = ({ carId }: { carId: string }) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const active = favorites.includes(carId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(carId);
  };

  return (
    <button
      className={css.btn}
      onClick={handleClick}
      aria-label={active ? "Видалити з обраного" : "Додати до обраного"}
    >
      {active ?
        <BsFillHeartFill size={20} className={css.iconActive} />
      : <BsHeart size={20} className={css.iconDefault} />}
    </button>
  );
};
