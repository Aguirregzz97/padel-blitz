"use client";

import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const ProfileButton = () => {
  const { user, isLoaded } = useUser();

  if (isLoaded && !user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8 bg-muted">
            <AvatarImage src="/img/profile.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="sign-in">
            <DropdownMenuItem className="cursor-pointer">
              Iniciar Sesion
            </DropdownMenuItem>
          </Link>
          <Link href="sign-up">
            <DropdownMenuItem className="cursor-pointer">
              Crear Cuenta
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <>{isLoaded && user && <UserButton afterSignOutUrl="/" />}</>;
};

export default ProfileButton;
