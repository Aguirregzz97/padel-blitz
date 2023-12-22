"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMyAdminTournaments from "@/queries/admin_tournaments/useMyAdminTournaments";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Torneos() {
  const { data: adminTournaments, isLoading } = useMyAdminTournaments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Mis Torneos</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ReloadIcon className="mr-2 h-5 w-5 animate-spin text-primary" />
        ) : (
          <div className="flex gap-8">
            {adminTournaments?.length === 0 ? (
              <p className="text-xs">No eres administrador de ningun torneo</p>
            ) : (
              adminTournaments?.map((tournament) => {
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
              })
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
