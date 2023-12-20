"use client";

import { useRouter } from "next/navigation";

export default function Torneos({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  router.push("/torneos/mis-torneos");

  return <></>;
}
