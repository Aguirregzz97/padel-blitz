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

const formSchema = z.object({
  category: z.string().min(2),
});

export default function UserSettings() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { category: "" },
  });

  const { isSubmitting } = form.formState;
  const { reset } = form;

  useEffect(() => {
    if (isLoaded && user) {
      console.log("heere", user.unsafeMetadata.category);
      const halt = setTimeout(function () {
        reset({ category: user.unsafeMetadata.category as string });
      }, 1);
      return () => clearTimeout(halt);
    }
  }, [user, isLoaded, form, reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await user?.update({ unsafeMetadata: { category: values.category } });
      toast({
        title: "Operacion realizada con exito",
        description: `se guardo la categoria "${values.category}"`,
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
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Ajustes de jugador</CardTitle>
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Primera">Primera</SelectItem>
                        <SelectItem value="Segunda">Segunda</SelectItem>
                        <SelectItem value="Tercera">Tercera</SelectItem>
                        <SelectItem value="Cuarta">Cuarta</SelectItem>
                        <SelectItem value="Quinta">Quinta</SelectItem>
                        <SelectItem value="Sexta">Sexta</SelectItem>
                        <SelectItem value="Septima">Septima</SelectItem>
                        <SelectItem value="Octava">Octava</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Esta es tu categoria, abajo los cachirules, se honesto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter>
                {!isSubmitting && (
                  <Button
                    disabled={!form.formState.isValid && form.formState.isDirty}
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
