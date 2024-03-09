<script lang="ts">
  import type { PageData } from "./$types";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import { InstagramLogo, Symbol, Exit } from "radix-icons-svelte";

  async function signOut() {
    await data.supabase.auth.signOut();
  }

  let className: string | undefined | null = undefined;
  export { className as class };

  let isLoading = false;
  async function onSubmit() {
    isLoading = true;

    setTimeout(() => {
      isLoading = false;
    }, 3000);
  }

  export let data: PageData;
</script>

<div
  class="container px-4 md:px-6 mx-auto flex items-center justify-center min-h-screen"
>
  <div class="flex flex-col items-center space-y-4 text-center">
    <div class="space-y-2">
      <p
        class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
      >
        Welcome to Pocket Note
      </p>
      {#if data.user}
        <div class="flex flex-col items-center space-y-3">
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold">Hi, {data.user.email}</h1>
            <p class="text-gray-500 dark:text-gray-400">
              Welcome to your profile. Here you can configure your private inbox
              link, plus other stuff
            </p>
          </div>
          <Avatar class="h-24 w-24">
            <AvatarImage alt="Your avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback
              >{data.user?.email?.charAt(0)?.toUpperCase() ||
                "A"}</AvatarFallback
            >
          </Avatar>
        </div>
      {/if}
      {#if data.user}
        <Button
          on:click={async () => {
            await signOut();
            window.location.href = "/login";
          }}
          variant="outline"
          type="button"
          disabled={isLoading}
        >
          {#if isLoading}
            <Symbol class="mr-2 h-4 w-4 animate-spin" />
          {:else}
            <Exit class="mr-2 h-4 w-4" />
          {/if}
          {" "}
          Sign Out
        </Button>
      {:else}
        <p class="px-8 text-center text-sm">You are not logged in</p>
      {/if}
    </div>
  </div>
</div>
