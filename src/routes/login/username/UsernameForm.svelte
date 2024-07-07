<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data: SuperValidated<Infer<FormSchema>>;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<main
  class="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950"
>
  <div class="max-w-md space-y-6 px-4">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Choose a Username
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Enter a unique username to continue.
      </p>
    </div>
    <form method="POST" use:enhance>
      <Form.Field {form} name="username">
        <Form.Control let:attrs>
          <Form.Label>Username</Form.Label>
          <Input {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
      <div class="flex justify-end">
        <Form.Button class="w-full">Submit</Form.Button>
      </div>
    </form>
  </div>
</main>
