<script lang="ts">
  import type { PageData } from "./$types";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import { InstagramLogo, Symbol, Exit } from "radix-icons-svelte";

  const { data } = $props();

  async function signOut() {
    await data.supabase.auth.signOut();
  }

  let inboxLink = $state("");
  //Fix this: inboxLink is not being updated correctly. It's just taking the username and not the expected full url
  $effect(() => {
    if (typeof window !== "undefined" && data.userProfile) {
      inboxLink = `${window.location.origin}/${data.userProfile.username}/${data.userProfile.currentInboxUrl}`;
    }
  });

  // let className: string | undefined | null = undefined;
  // export { className as class };

  let isLoading = $state(false);
  async function onSubmit() {
    isLoading = true;

    setTimeout(() => {
      isLoading = false;
    }, 3000);
  }

  $inspect(data);
</script>

<div
  class="container px-4 md:px-6 mx-auto flex items-center justify-center min-h-screen"
>
  <div class="flex flex-col items-center text-center">
    <div>
      <p
        class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
      >
        Welcome to Pocket Note
      </p>
      {#if data.user}
        <div class="flex flex-col items-center">
          <div class="text-center">
            <h1 class="text-3xl font-bold">
              Hi, {data.userProfile?.username}
            </h1>
            <div class="flex justify-center">
              <Avatar class="h-24 w-24">
                <!-- <AvatarImage alt="Your avatar" src="/placeholder-avatar.jpg" /> -->
                <AvatarFallback
                  >{data.user?.email?.charAt(0)?.toUpperCase() ||
                    "A"}</AvatarFallback
                >
              </Avatar>
            </div>
            <p class="text-gray-500 dark:text-gray-400">
              Welcome to your profile. Here you can configure your private inbox
              link, plus other stuff
            </p>
          </div>
          <div
            class="p-4 my-11 bg-black rounded-xl shadow-md flex items-center space-x-4"
          >
            <p class="text-white">
              Your new inbox link is: <a href={inboxLink}>{inboxLink}</a>
            </p>
          </div>
        </div>
      {/if}
      {#if data.user}
        <Button
          onclick={async () =>
            (window.location.href = `/${data.userProfile.username}/message`)}
          variant="default"
          type="button"
        >
          Go to Message Window
        </Button>
        <Button
          onclick={async () => {
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
