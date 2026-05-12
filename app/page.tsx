import Image from "next/image";
import css from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className={css.hero}>
        <Image
          className={css.image}
          src="/710ea4328a5c0351a1a533bf4cc2bd8ac49f2a01.jpg"
          alt="Rental car"
          fill
          priority
        />
        <div className={css.overlay}>
          <div className={css.heroContent}>
            <h1 className={css.title}>Find your perfect rental car</h1>

            <p className={css.text}>
              Reliable and budget-friendly rentals for any journey
            </p>

            <Link className={`btn ${css.button}`} href="/catalog">
              View Catalog
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
