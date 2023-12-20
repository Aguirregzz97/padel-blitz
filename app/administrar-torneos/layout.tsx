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
      <nav className={cn("m-2 flex items-center space-x-4 lg:space-x-6")}>
        <Link
          href="/administrar-torneos/mis-torneos"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            !pathname.includes("/mis-torneos") ? "text-muted-foreground" : ""
          }`}
        >
          Mis torneos
        </Link>
        <Link
          href="/administrar-torneos/crear-torneo"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            !pathname.includes("/crear-torneo") ? "text-muted-foreground" : ""
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="mr-2"
          >
            <PlusCircle className="h-6 w-6" />
            <span className="sr-only">Crear Torneo</span>
          </Button>
        </Link>
      </nav>
      {children}
    </div>
  );
}
