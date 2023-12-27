import CreateTournamentForm from "@/components/Tournaments/CreateTournamentForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function CrearTorneo() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="text-md">
          <div className="mt-1 flex items-center">
            Crear Torneo
            <Trophy className="ml-2 h-5 w-5 text-primary" />
          </div>
        </CardTitle>
      </CardHeader>
      <CreateTournamentForm />
    </Card>
  );
}
