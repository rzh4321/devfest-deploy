"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "./file-upload";
import { updateProfileSchema } from "@/schemas";
import { updateProfile } from "@/actions/actions";

const EditProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await updateProfile(values);
      location.reload(); // refresh profile page after updating
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-2">
            <Pencil />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex gap-3 flex-col"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="url">Profile image</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                        endpoint={"authorizedImage"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="flex items-center space-x-4">
                  <div className="text-red-500">{error}</div>
                  <Button
                    disabled={
                      isSubmitting ||
                      (!form.getValues().name.trim() &&
                        !form.getValues().url.trim())
                    }
                    className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-blue-400 hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none"
                    type="submit"
                  >
                    Save changes
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
