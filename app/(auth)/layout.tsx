"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, use } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  // if (!session) redirect("/login");
  return <>{children}</>;
};

export default AuthLayout;
