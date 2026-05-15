"use client";

import { useEffect } from "react";
import { useIsFetching } from "@tanstack/react-query";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, speed: 400 });

export default function GlobalLoader() {
  const isFetching = useIsFetching();

  useEffect(() => {
    if (isFetching) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  return null;
}
