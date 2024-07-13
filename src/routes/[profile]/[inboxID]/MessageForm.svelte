<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Textarea } from "$lib/components/ui/textarea";
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
  class="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-24 dark:bg-gray-950"
>
  <div class="flex-auto max-w-lg justify-center space-y-6">
    <div class="max-w-lg space-y-6 px-">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Write a message
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">It can be anything</p>
      </div>
      <form method="POST" use:enhance>
        <Form.Field {form} name="message">
          <Form.Control let:attrs>
            <Form.Label>Cool message from you</Form.Label>
            <Textarea
              class="w-full"
              {...attrs}
              bind:value={$formData.message}
            />
          </Form.Control>
          <Form.Description>Write a nice message</Form.Description>
          <Form.FieldErrors />
        </Form.Field>
        <div class="flex justify-end">
          <Form.Button class="w-auto">Submit</Form.Button>
        </div>
      </form>
    </div>
  </div>
</main>
