"use client";

import ViewEditTournamentForm from "@/components/Tournaments/ViewEditTournamentForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useTournament from "@/queries/tournament/useTournament";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowBigLeft, ListOrdered, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyAdminTournament({
  params,
}: {
  params: { tournamentId: string };
}) {
  const router = useRouter();

  const {
    data: tournament,
    isLoading: isLoadingTournament,
    refetch,
  } = useTournament(params.tournamentId);

  return (
    <Card className="relative min-h-[24rem] max-w-lg">
      {isLoadingTournament || !tournament ? (
        <ReloadIcon className="m-4 h-5 w-5 animate-spin text-primary" />
      ) : (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="absolute right-0 top-0 mr-2 mt-2 p-2 hover:text-primary"
                variant="ghost"
                onClick={() =>
                  router.push(
                    `/administrar-torneos/mis-torneos/${tournament.id}/categories`,
                  )
                }
              >
                <ListOrdered className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ver Categorias</p>
            </TooltipContent>
          </Tooltip>
          <CardHeader className="px-4">
            <CardTitle className="text-md">
              <div className="flex items-center gap-1">
                <Button
                  className="p-2 hover:text-primary"
                  variant="ghost"
                  onClick={() =>
                    router.push(`/administrar-torneos/mis-torneos`)
                  }
                >
                  <ArrowBigLeft className="h-5 w-5" />
                </Button>
                <div className="mt-1 flex items-center">
                  {tournament.name}
                  <Trophy className="ml-2 h-5 w-5 text-primary" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <ViewEditTournamentForm
            tournament={tournament}
            refetchTournament={refetch}
          />
        </>
      )}
    </Card>
  );
}
