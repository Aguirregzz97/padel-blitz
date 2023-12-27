"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMyAdminTournaments from "@/queries/admin_tournaments/useMyAdminTournaments";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Image, PenSquare, Trophy } from "lucide-react";
import Link from "next/link";

export default function Torneos() {
  const { data: adminTournaments, isLoading } = useMyAdminTournaments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">
          <div className="mt-1 flex items-center">
            Mis Torneos
            <Trophy className="ml-2 h-5 w-5" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !adminTournaments ? (
          <ReloadIcon className="mr-2 h-5 w-5 animate-spin text-primary" />
        ) : (
          <div className="flex flex-wrap gap-4">
            {adminTournaments?.length === 0 ? (
              <p className="text-xs">No eres administrador de ningun torneo</p>
            ) : (
              adminTournaments?.map((tournament) => {
                return (
                  <Card key={tournament.id} className="relative max-w-[250px]">
                    <CardHeader className="pl-4">
                      <CardTitle>
                        <div className="text-md mt-1 flex items-center">
                          <Trophy className="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] text-primary" />
                          <p className="text-sm">{tournament.name}</p>
                        </div>
                      </CardTitle>
                      <Link
                        className="absolute right-0 top-0"
                        href={`/administrar-torneos/mis-torneos/${tournament.id}`}
                      >
                        <Button
                          className="mr-2 mt-1 h-[1.125rem] w-[1.125rem] p-0 hover:text-primary"
                          variant="ghost"
                        >
                          <PenSquare className="h-[1.125rem] w-[1.125rem]" />
                        </Button>
                      </Link>
                    </CardHeader>
                    <CardContent className="pb-4 pl-4">
                      <div className="flex flex-col gap-y-2">
                        <p className="text-sm">
                          Creado:{" "}
                          <span className="font-bold">
                            {" "}
                            {format(
                              new Date(tournament?.created_at || 0),
                              "LLL dd, y",
                            )}
                          </span>
                        </p>
                        <p className="text-sm">
                          Creado Por:{" "}
                          <span className="font-bold">
                            {" "}
                            {tournament.owner_first_name}{" "}
                            {tournament.owner_last_name}
                          </span>
                        </p>
                        {tournament.banner_url && (
                          <div className="flex items-center justify-center">
                            <Link href={tournament.banner_url} target="_blank">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    className="mt-2 p-2 hover:text-primary"
                                    variant="ghost"
                                    type="button"
                                  >
                                    <Image className="h-5 w-5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Ver banner</p>
                                </TooltipContent>
                              </Tooltip>
                            </Link>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
