"use client";

import ViewEditTournamentForm from "@/components/Tournaments/ViewEditTournamentForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useTournament from "@/queries/tournament/useTournament";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowBigLeft, Book, ListOrdered, Trophy } from "lucide-react";
import Link from "next/link";
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
    <Card className="mb-2">
      {isLoadingTournament || !tournament ? (
        <ReloadIcon className="m-4 h-5 w-5 animate-spin text-primary" />
      ) : (
        <>
          <CardHeader className="p-4 pb-2">
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
          <CardContent className="grid grid-cols-6 grid-rows-6 gap-4 p-4">
            <Card className="col-span-full row-span-6 md:col-span-4">
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center">
                    Info de torneo
                    <Book className="ml-2 h-6 w-6 text-primary" />
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ViewEditTournamentForm
                  tournament={tournament}
                  refetchTournament={refetch}
                />
              </CardContent>
            </Card>
            <Card className="col-span-full row-span-3 md:col-span-2">
              {isLoadingTournament || !tournament ? (
                <ReloadIcon className="m-4 h-5 w-5 animate-spin text-primary" />
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="text-md">
                      <div className="mt-1 flex items-center">
                        <p>Categorias</p>
                        <ListOrdered className="ml-3 h-6 w-6 text-primary" />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {tournament.categories.map((category) => {
                        return (
                          <nav
                            className={cn(
                              "m-2 mb-4 flex items-center space-x-4 lg:space-x-6",
                            )}
                          >
                            <Link
                              href={`/administrar-torneos/mis-torneos/${tournament.id}/categories/${category.category_type_id}`}
                              className={`text-sm font-medium transition-colors hover:text-primary`}
                            >
                              <Button>
                                {category.category.category_name}{" "}
                                <Trophy className="ml-2 h-5 w-5" />
                              </Button>
                            </Link>
                          </nav>
                        );
                      })}
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </CardContent>
        </>
      )}
    </Card>
  );
}
