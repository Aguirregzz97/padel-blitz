"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useTournament from "@/queries/tournament/useTournament";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowBigLeft, ListOrdered, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function TournamentCategories({
  params,
}: {
  params: { tournamentId: string };
}) {
  const { data: tournament, isLoading: isLoadingTournament } = useTournament(
    params.tournamentId,
  );

  const pathname = usePathname();
  const router = useRouter();

  return (
    <Card className="min-h-[12rem]">
      {isLoadingTournament || !tournament ? (
        <ReloadIcon className="m-4 h-5 w-5 animate-spin text-primary" />
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-md">
              <div className="mt-1 flex items-center">
                <Button
                  className="mr-2 p-1 hover:text-primary"
                  variant="ghost"
                  onClick={() =>
                    router.push(
                      `/administrar-torneos/mis-torneos/${tournament.id}`,
                    )
                  }
                >
                  <ArrowBigLeft className="h-5 w-5" />
                </Button>
                <p>{tournament?.name}</p>
                <ListOrdered className="ml-3 h-6 w-6" />
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
  );
}
