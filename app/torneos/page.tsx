"use client";

import { useRouter } from "next/navigation";

export default function Torneos() {
  const router = useRouter();

  router.push("/torneos/mis-torneos");

  return <></>;
}
