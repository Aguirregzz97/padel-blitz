"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMyAdminTournaments from "@/queries/admin_tournaments/useMyAdminTournaments";

export default function Torneos() {
  const { data: adminTournaments, isLoading } = useMyAdminTournaments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Mis Torneos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          {adminTournaments?.map((tournament) => {
            return (
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>{tournament.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{tournament.created_at?.toString()}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
