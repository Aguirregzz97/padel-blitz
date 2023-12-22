"use client";

import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
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
import useCities from "@/queries/city/useCities";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import useCreateTourment from "@/mutations/useCreateTournament";
import useCategoryTypes from "@/queries/category_type/useCategoryTypes";
import { useEffect, useState } from "react";
import { MultiSelect } from "../ui/multiselect";
import { DevT } from "@/utils/reacthookform";

const today = new Date();
const two_after_tomorrow = new Date(today);
two_after_tomorrow.setDate(two_after_tomorrow.getDate() + 3);

export const createTournamentFormSchema = z.object({
  city_id: z
    .string({ required_error: "" })
    .min(1, { message: "al menos 1 caracter" }),
  name: z
    .string({ required_error: "" })
    .min(1, { message: "al menos 1 caracter" }),
  categories: z.array(z.record(z.string().trim())).nonempty(),
  address: z
    .string({ required_error: "" })
    .min(1, { message: "al menos 1 caracter" }),
  registration_dates: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { required_error: "" },
  ),
  tournament_dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export default function CreateTournamentForm() {
  const form = useForm<z.infer<typeof createTournamentFormSchema>>({
    resolver: zodResolver(createTournamentFormSchema),
    defaultValues: {
      city_id: undefined,
      name: undefined,
      categories: [],
      address: undefined,
      registration_dates: { from: undefined, to: undefined },
      tournament_dates: { from: undefined, to: undefined },
    },
  });

  const { toast } = useToast();

  const [categoriesOptions, setCategoriesOptions] = useState<
    Record<string, string>[]
  >([]);

  const { isSubmitting } = form.formState;

  const { data: cities, isLoading: isLoadingCities } = useCities();

  const { data: categoryTypes, isLoading: isLoadingCategoryTypes } =
    useCategoryTypes();

  const { mutateAsync } = useCreateTourment(onSuccess, onError);

  useEffect(() => {
    if (!isLoadingCategoryTypes && categoryTypes) {
      const multiselectOptions = categoryTypes.map((ct) => {
        return {
          label: ct.category_name,
          value: ct.id.toString(),
        };
      });
      setCategoriesOptions(multiselectOptions);
    }
  }, [categoryTypes]);

  function onSuccess() {
    toast({
      title: "Operacion realizada con exito",
      description: <span>Se creo el torneo correctamente</span>,
    });
  }

  function onError(error: Error) {
    toast({
      variant: "destructive",
      title: "something went wrong",
      description: <>{error.message}</>,
    });
  }

  async function onSubmit(values: z.infer<typeof createTournamentFormSchema>) {
    await mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="mb-3 flex flex-col gap-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del torneo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field: { ...field } }) => (
              <FormItem>
                <FormLabel>Categorias</FormLabel>
                {categoriesOptions.length > 0 ? (
                  <MultiSelect
                    selected={field.value}
                    options={categoriesOptions}
                    placeholder="Seleccionar..."
                    {...field}
                  />
                ) : (
                  <Skeleton className="h-9 w-full" />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registration_dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Dias de registro</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Selecciona un rango</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tournament_dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Dias de torneo</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Selecciona un rango</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        <SelectValue placeholder="Selecciona" />
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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Direccion de donde se jugara el torneo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            /> */}
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
      <DevT control={form.control} />
    </Form>
  );
}
