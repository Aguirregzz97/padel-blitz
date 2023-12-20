"use client";

import { useRouter } from "next/navigation";

export default function Torneos() {
  const router = useRouter();

  router.push("/administrar-torneos/mis-torneos");

  return <></>;
}
