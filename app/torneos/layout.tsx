"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Torneos({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="m-8">
      <nav className={cn("m-2 mb-6 flex items-center space-x-4 lg:space-x-6")}>
        <Link
          href="/torneos/mis-torneos"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            !pathname.includes("/mis-torneos")
              ? "text-muted-foreground"
              : "text-primary"
          }`}
        >
          Mis torneos
        </Link>
        <Link
          href="/torneos/explorar-torneos"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            !pathname.includes("/explorar-torneos")
              ? "text-muted-foreground"
              : "text-primary"
          }`}
        >
          Explorar Torneos
        </Link>
      </nav>
      {children}
    </div>
  );
}
