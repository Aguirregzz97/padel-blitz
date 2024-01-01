"use client";

import EnroleInTournamentForm from "@/components/Tournaments/ EnroleInTournamentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useTournament from "@/queries/tournament/useTournament";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LogIn } from "lucide-react";

export default function TournamentEnrole({
  params,
}: {
  params: { tournamentId: string };
}) {
  const { data: tournament, isLoading: isLoadingTournament } = useTournament(
    params.tournamentId,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isLoadingTournament && !tournament && (
            <ReloadIcon className="mr-2 h-5 w-5 animate-spin text-primary" />
          )}
          {tournament && (
            <div className="mt-1 flex items-center">
              {tournament?.name} (ENROLAR)
              <LogIn className="ml-2 h-5 w-5" />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EnroleInTournamentForm
          isLoadingTournament={isLoadingTournament}
          tournament={tournament}
        />
      </CardContent>
    </Card>
  );
}
