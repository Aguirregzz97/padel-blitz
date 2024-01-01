"use client";

import EnroleInTournamentForm from "@/components/Tournaments/ EnroleInTournamentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function TournamentEnrole({
  params,
}: {
  params: { tournamentId: string };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="mt-1 flex items-center">
            Enrolar en torneo
            <LogIn className="ml-2 h-5 w-5" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EnroleInTournamentForm tournamentId={params.tournamentId} />
      </CardContent>
    </Card>
  );
}
