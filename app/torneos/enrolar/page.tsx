"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useExploreTournaments from "@/queries/tournament/useExploreTournaments";
import { ReloadIcon } from "@radix-ui/react-icons";
import format from "date-fns/format";
import {
  Trophy,
  Image,
  MapPin,
  Eye,
  Calendar,
  Swords,
  LogIn,
} from "lucide-react";
import Link from "next/link";

const today = new Date();

function getTournamentStatus(
  registration_start_at: Date | null,
  registration_end_at: Date | null,
  tournament_start_at: Date | null,
  tournament_end_at: Date | null,
) {
  if (
    today > new Date(registration_start_at || "") &&
    today < new Date(registration_end_at || "")
  ) {
    return "En registro";
  }

  if (
    today > new Date(tournament_start_at || "") &&
    today < new Date(tournament_end_at || "")
  ) {
    return "En progreso";
  }

  return "Registro no ha comenzado";
}

export default function EnroleInTournament() {
  const { data: myTournaments, isLoading } = useExploreTournaments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">
          <div className="mt-1 flex items-center">
            Torneos en registro
            <Trophy className="ml-2 h-5 w-5" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !myTournaments ? (
          <ReloadIcon className="mr-2 h-5 w-5 animate-spin text-primary" />
        ) : (
          <div className="flex flex-wrap gap-4">
            {myTournaments?.length === 0 ? (
              <p className="text-xs">No eres administrador de ningun torneo</p>
            ) : (
              myTournaments?.map((tournament) => {
                return (
                  <Card key={tournament.id} className="relative max-w-[250px]">
                    <CardHeader className="mb-4 border-b-2 pb-3 pl-4">
                      <CardTitle>
                        <div className="text-md mt-1 flex items-center">
                          <Trophy className="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] text-primary" />
                          <p className="text-sm">{tournament.name}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4 pl-4">
                      <div className="flex flex-col gap-y-3">
                        <p className="flex items-center text-sm">
                          <Calendar className="mr-2 h-5 w-5 text-primary" />
                          <span>
                            {format(
                              new Date(tournament?.registration_start_at || ""),
                              "LLL dd, y",
                            )}{" "}
                            {"->"}{" "}
                            {format(
                              new Date(tournament?.registration_end_at || ""),
                              "LLL dd, y",
                            )}
                          </span>
                        </p>
                        <p className="flex items-center text-sm">
                          <MapPin className="mr-2 h-5 w-5 text-primary" />
                          <span>{tournament.city_name}</span>
                        </p>
                        <p className="flex items-center text-sm">
                          <Eye className="mr-2 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] text-primary" />
                          <span className="">
                            {getTournamentStatus(
                              tournament.registration_start_at,
                              tournament.tournament_end_at,
                              tournament.tournament_start_at,
                              tournament.tournament_end_at,
                            )}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap items-center justify-center gap-2">
                      {tournament.banner_url && (
                        <Link href={tournament.banner_url} target="_blank">
                          <Button
                            className="p-2 hover:text-primary"
                            type="button"
                          >
                            Banner <Image className="ml-1 h-5 w-5" />
                          </Button>
                        </Link>
                      )}
                      <Button>
                        Enrolar <LogIn className="ml-1 h-5 w-5" />
                      </Button>
                    </CardFooter>
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
