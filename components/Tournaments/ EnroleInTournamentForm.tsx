"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { CardContent, CardFooter } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import { DevT } from "@/utils/reacthookform";
import { useRouter } from "next/navigation";
import SelectPartner from "./Partner/SelectPartner";
import { getTournamentType } from "@/lib/tournament/getTournament";
import useDbUser from "@/queries/user/useDbUser";
import useRegisterTeam from "@/mutations/teams/useRegisterTeam";

export const enroleInTournamentFormSchema = z.object({
  category_tournament_id: z.string().min(1, { message: "categoria requerida" }),
  partner: z.string().min(1, { message: "partener requerido" }),
});

export default function EnroleInTournamentForm({
  tournament,
  isLoadingTournament,
}: {
  tournament: getTournamentType | undefined;
  isLoadingTournament: boolean;
}) {
  const router = useRouter();
  const { data: currentUser, isLoading: isLoadingUser } = useDbUser();

  const form = useForm<z.infer<typeof enroleInTournamentFormSchema>>({
    resolver: zodResolver(enroleInTournamentFormSchema),
    defaultValues: {
      category_tournament_id: undefined,
      partner: undefined,
    },
  });

  const { toast } = useToast();

  const { isSubmitting } = form.formState;

  const { mutateAsync } = useRegisterTeam(onSuccess, onError);

  function onSuccess() {
    toast({
      title: "Operacion realizada con exito",
      description: <span>Se registro el equipo correctamente</span>,
    });
    router.push("/torneos/mis-torneos");
  }

  function onError(error: Error) {
    toast({
      variant: "destructive",
      title: "something went wrong",
      description: <>{error.message}</>,
    });
  }

  async function onSubmit(
    values: z.infer<typeof enroleInTournamentFormSchema>,
  ) {
    if (currentUser) {
      await mutateAsync({
        playerId1: currentUser.id,
        playerId2: values.partner,
        categoryTournamentId: values.category_tournament_id,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="mb-3 flex flex-col gap-y-6">
          <FormField
            control={form.control}
            name="category_tournament_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                {isLoadingTournament ? (
                  <Skeleton className="h-9 w-full" />
                ) : (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tournament?.categories.map((category, idx) => {
                        return (
                          <SelectItem key={idx} value={category.id.toString()}>
                            {category.category.category_name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="partner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partner</FormLabel>
                <FormControl>
                  <SelectPartner
                    onValueSelected={(userId) => {
                      form.setValue("partner", userId, { shouldDirty: true });
                      form.clearErrors("partner");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          {(!isSubmitting || isLoadingTournament) && (
            <Button
              disabled={!form.formState.isDirty}
              className="w-full"
              type="submit"
            >
              Enrolar
            </Button>
          )}
          {isSubmitting && (
            <Button className="w-full" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          )}
        </CardFooter>
      </form>
      <DevT control={form.control} />
    </Form>
  );
}
