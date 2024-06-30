<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import UserAuthForm from "$lib/components/UserAuthForm.svelte";
  import { startSpan } from "@sentry/sveltekit";
  import type { PageData } from "./$types";

  // export let data: PageData;
</script>

<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
  <div class="container px-4 md:px-6">
    <div class="flex flex-col items-center space-y-4 text-center">
      <div class="space-y-2">
        <h1
          class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
        >
          Pocket Note
        </h1>
        <p
          class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
        >
          Your Lobby in the Web. Every New Tab. Customize it and Make it yours.
        </p>
      </div>
      <div class="space-x-4">
        <Button href="/login" variant="default">Start</Button>
      </div>
    </div>
  </div>
</section>
