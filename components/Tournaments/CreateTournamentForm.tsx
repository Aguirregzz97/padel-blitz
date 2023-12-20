"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { CardContent, CardFooter } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import useCities from "@/queries/city/useCities";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  city_id: z.string(),
  // name: z.string(),
  // address: z.string(),
  // banner_url: z.string(),
  // registration_end_at: z.date(),
  // registration_start_at: z.date(),
  // tournament_start_at: z.date(),
  // tournament_end_at: z.date(),
});

export default function CreateTournamentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_id: undefined,
    },
  });

  const { toast } = useToast();

  const { isSubmitting } = form.formState;

  const { data: cities, isLoading: isLoadingCities } = useCities();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("submitted!", values);
      toast({
        title: "Operacion realizada con exito",
        description: <span>Se creo el torneo correctamente</span>,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "something went wrong",
        description: error,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="mb-3 flex flex-col gap-y-3">
          <FormField
            control={form.control}
            name="city_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                {isLoadingCities ? (
                  <Skeleton className="h-9 w-full" />
                ) : (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities?.map((city, idx) => {
                        return (
                          <SelectItem key={idx} value={city.id.toString()}>
                            {city.name}
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
        </CardContent>
        <CardFooter>
          {(!isSubmitting || isLoadingCities) && (
            <Button
              disabled={!form.formState.isDirty}
              className="w-full"
              type="submit"
            >
              Guardar
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
    </Form>
  );
}
