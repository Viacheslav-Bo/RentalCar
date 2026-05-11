// app/not-found.tsx

import Link from "next/link";

const NotFound = () => {
  return (
    <main>
      <h1>404 - Сторінку не знайдено</h1>

      <Link href="/">Повернутися на головну</Link>
    </main>
  );
};

export default NotFound;
