import CreateTournamentForm from "@/components/Tournaments/CreateTournamentForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CrearTorneo() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-md">Crear Torneo</CardTitle>
      </CardHeader>
      <CreateTournamentForm />
    </Card>
  );
}
