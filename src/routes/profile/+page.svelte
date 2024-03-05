<script lang="ts">
  import type { PageData } from "./$types";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";

  export let data: PageData;
</script>

<div class="container px-4 md:px-6">
  <div class="flex flex-col items-center space-y-4 text-center">
    <div class="space-y-2">
      <p
        class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
      >
        Welcome to site
      </p>
    </div>
  </div>
</div>

{#if data.user}
  <div class="flex flex-col items-center space-y-3">
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-bold">Hi, Jane</h1>
      <p class="text-gray-500 dark:text-gray-400">
        Welcome to your dashboard. From here you can manage your account and
        access exclusive content.
      </p>
    </div>
    <Avatar class="h-24 w-24">
      <AvatarImage alt="Your avatar" src="/placeholder-avatar.jpg" />
      <AvatarFallback>JA</AvatarFallback>
    </Avatar>
  </div>
{/if}
