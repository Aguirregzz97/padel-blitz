"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import useCategories from "@/queries/categories/useCategories";
import { Skeleton } from "@/components/ui/skeleton";

const GENDER = ["Hombre", "Mujer"] as const;

const formSchema = z.object({
  category: z.string(),
  gender: z.enum(GENDER),
});

export default function UserSettings() {
  const { user, isLoaded } = useUser();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = form.formState;
  const { reset } = form;

  useEffect(() => {
    if (isLoaded && user) {
      const halt = setTimeout(function () {
        reset({
          category: user.unsafeMetadata.category as string,
          gender: user.unsafeMetadata.gender as (typeof GENDER)[number],
        });
      }, 1);
      return () => clearTimeout(halt);
    }
  }, [user, isLoaded, form, reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await user?.update({
        unsafeMetadata: { category: values.category, gender: values.gender },
      });
      toast({
        title: "Operacion realizada con exito",
        description: (
          <span>
            se actualizo correctamente la informacion de usuario con la
            categoria <code className="font-bold">{values.category}</code> y el
            genero <code className="font-bold">{values.gender}</code>{" "}
          </span>
        ),
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
    <div className="m-8">
      <h2 className="mb-8 text-3xl font-bold tracking-tight">Andres Aguirre</h2>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Ajustes de jugador</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    {isLoadingCategories ? (
                      <Skeleton className="h-9 w-full" />
                    ) : (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category, idx) => {
                            return (
                              <SelectItem
                                key={idx}
                                value={category.id.toString()}
                              >
                                {category.category_name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                    <FormDescription>
                      Esta es tu categoria, abajo los cachirules, se honesto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu genero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={GENDER[0]}>{GENDER[0]}</SelectItem>
                        <SelectItem value={GENDER[1]}>{GENDER[1]}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter>
                {(!isSubmitting || isLoadingCategories) && (
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
        </CardContent>
      </Card>
    </div>
  );
}
