"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { User } from "@/hooks/auth";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
});

type FormValues = z.infer<typeof formSchema>;

export function UpdateProfileForm({
  user,
  update,
}: {
  user: User;
  update: (
    values: FormValues,
  ) => Promise<{ success: true } | { success: false; error: string }>;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const result = await update(values);

      if (!result.success) {
        toast.error(result.error);
      } else {
        toast.success("Profile updated successfully");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder={user.name} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input placeholder={user.email} type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button className="w-full" disabled={isPending} variant="secondary">
              {isPending && <ReloadIcon className="mr-2 animate-spin" />}
              Update
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}