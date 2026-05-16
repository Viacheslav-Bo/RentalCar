"use client";

import { useEffect } from "react";
import Link from "next/link";
import css from "./error.module.css";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error("Catalog Error:", error);
  }, [error]);

  return (
    <main className="container">
      <div className={css.wrapper}>
        <h1 className={css.code}>ERR</h1>

        <h2 className={css.title}>Something went wrong</h2>

        <p className={css.text}>
          We couldn’t load the car catalog. This might be due to a temporary
          server issue or network disruption.
        </p>

        <div className={css.buttonGroup}>
          <button className="btn" onClick={reset}>
            Try Again
          </button>

          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
