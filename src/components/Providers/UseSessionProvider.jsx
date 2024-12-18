"use client";

import { SessionProvider } from "next-auth/react";

function UseSessionProvider({ children }) {
  return <SessionProvider refetchInterval={11}>{children}</SessionProvider>;
}

export default UseSessionProvider;
