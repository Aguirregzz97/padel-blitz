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
          <Avatar className="bg-muted">
            <AvatarImage src="/img/profile.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="sign-in">
            <DropdownMenuItem className="cursor-pointer">
              Sign In
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <>{isLoaded && user && <UserButton afterSignOutUrl="/" />}</>;
};

export default ProfileButton;
