import Link from "next/link";
import css from "./not-found.module.css";

const NotFound = () => {
  return (
    <main className="container">
      <div className={css.wrapper}>
        <h1 className={css.code}>404</h1>
        <h2 className={css.title}>Oops! Page not found</h2>
        <p className={css.text}>
          We couldn’t find the page you’re looking for.
        </p>
        <Link href="/" className="btn">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
