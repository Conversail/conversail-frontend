"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider enableSystem={true}>{children}</ThemeProvider>;
}

export default Providers;
