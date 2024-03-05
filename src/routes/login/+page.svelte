<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import UserAuthForm from "$lib/components/UserAuthForm.svelte";
  import { startSpan } from "@sentry/sveltekit";
  import type { PageData } from "./$types";
  import { InstagramLogo, Symbol, Exit } from "radix-icons-svelte";

  export let data: PageData;

  async function signInWithFacebook() {
    await data.supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

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
</script>

<div class="md:hidden">
  <!-- <img
    src="/examples/authentication-light.png"
    width={1280}
    height={843}
    alt="Authentication"
    class="block dark:hidden"
  />
  <img
    src="/examples/authentication-dark.png"
    width={1280}
    height={843}
    alt="Authentication"
    class="hidden dark:block"
  /> -->
</div>
<div
  class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
  <!-- <Button
    href="/examples/authentication"
    variant="ghost"
    class="absolute right-4 top-4 md:right-8 md:top-8"
  >
    Login
  </Button> -->
  <div
    class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
  >
    <div
      class="absolute inset-0 bg-cover"
      style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
    />
    <div class="relative z-20 flex items-center text-lg font-medium">
      <!-- <Command class="mr-2 h-6 w-6" /> -->
      Pocket Note
    </div>
    <div class="relative z-20 mt-auto">
      <blockquote class="space-y-2">
        <p class="text-lg">
          &ldquo;This product has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before. Highly
          recommended!&rdquo;
        </p>
        <footer class="text-sm">Sofia Davis</footer>
      </blockquote>
    </div>
  </div>
  <div class="lg:p-8">
    <div
      class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
    >
      <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
        <!-- <p class="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p> -->
      </div>
      <!-- <UserAuthForm /> -->
      <Button
        on:click={() => signInWithFacebook()}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {#if isLoading}
          <Symbol class="mr-2 h-4 w-4 animate-spin" />
        {:else}
          <!-- <InstagramLogo class="mr-2 h-4 w-4" /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="mr-2 h-4 w-4"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
            />
          </svg>
        {/if}
        {" "}
        Sign In with Facebook
      </Button>
      <p class="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a
          href="/terms"
          class="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          class="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </a>
        .
      </p>
      {#if data.user}
        <p class="px-8 text-center text-sm text-muted-foreground">
          {data.user.email}
          <Button
            on:click={() => signOut()}
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
        </p>
      {:else}
        <p class="px-8 text-center text-sm">You are not logged in</p>
      {/if}
    </div>
  </div>
</div>
