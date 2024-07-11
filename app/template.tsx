"use client";

import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    nprogress.complete();
    console.log("COMPLETE");
    return () => {
      console.log("START");
      nprogress.start();
    };
  }, []);

  return (
    <>
      <NavigationProgress />
      {children}
    </>
  );
}
