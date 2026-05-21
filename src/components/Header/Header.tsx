"use client";
import { usePathname } from "next/navigation";

import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        <svg width="104" height="16">
          <use href="/logo.svg"></use>
        </svg>
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={pathname === "/" ? css.active : ""} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/catalog" ? css.active : ""}
              href="/catalog"
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
