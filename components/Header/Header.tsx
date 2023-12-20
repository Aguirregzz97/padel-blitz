"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Moon, Sun, UserCog } from "lucide-react";
import Container from "../ui/Container";
import { Button } from "../ui/button";
import ProfileButton from "./ProfileButton";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      href: "/mis-juegos",
      label: "Mis Juegos",
    },
    {
      href: "/torneos",
      label: "Torneos",
    },
    {
      href: "/jugadores",
      label: "Jugadores",
    },
    {
      href: "/administrar-torneos",
      label: "Admin Torneos",
    },
  ];

  return (
    <header className="mt-2 border-b border-border px-2 py-2 sm:flex sm:justify-between">
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-2 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <SheetClose asChild key={i}>
                      <Link
                        key={i}
                        href={route.href}
                        className="block px-2 py-1 text-lg"
                      >
                        {route.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="whitespace-nowrap text-xl font-bold">
                PADEL BLITZ
              </h1>
            </Link>
          </div>
          <nav className="mx-6 hidden items-center space-x-4 md:block lg:space-x-6">
            {routes.map((route, i) => (
              <Button
                className={`${
                  pathname.includes(route.href) ? "bg-accent" : ""
                }`}
                key={i}
                asChild
                variant="ghost"
              >
                <Link
                  key={i}
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="User Settings"
              className={`mr-1 ${
                pathname.includes("user-settings") ? "bg-accent" : ""
              }`}
              onClick={() => router.push("/user-settings")}
            >
              <UserCog />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-2"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
