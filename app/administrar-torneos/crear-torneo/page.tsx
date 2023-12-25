import CreateTournamentForm from "@/components/Tournaments/CreateTournamentForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function CrearTorneo() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="text-md">Crear Torneo</CardTitle>
      </CardHeader>
      <CreateTournamentForm />
    </Card>
  );
}
