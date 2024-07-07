<script lang="ts">
  import type { PageData } from "./$types";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { ConsoleLogWriter } from "drizzle-orm";

  export let data: PageData;

  console.log(data.user);
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
    <form class="space-y-4">
      <div>
        <Label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          for="name"
        >
          Name
        </Label>
        <div class="mt-1">
          <Input
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="name"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <Label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          for="username"
        >
          Username
        </Label>
        <div class="mt-1">
          <Input
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="username"
            placeholder="Enter a username"
            type="text"
          />
        </div>
      </div>
      <Button class="w-full">Submit</Button>
    </form>
  </div>
</main>
