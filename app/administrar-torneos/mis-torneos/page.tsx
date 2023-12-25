"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMyAdminTournaments from "@/queries/admin_tournaments/useMyAdminTournaments";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function Torneos() {
  const { data: adminTournaments, isLoading } = useMyAdminTournaments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Mis Torneos</CardTitle>
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
                  <Card key={tournament.id} className="max-w-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{tournament.name}</CardTitle>
                        <Link
                          href={`/administrar-torneos/mis-torneos/${tournament.id}`}
                        >
                          <Button
                            className="p-2 hover:text-primary"
                            variant="ghost"
                          >
                            <Pencil className="h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
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
