<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import UserAuthForm from "$lib/components/UserAuthForm.svelte";
  import { startSpan } from "@sentry/sveltekit";
  import type { PageData } from "./$types";
  import { InstagramLogo, Symbol, Exit } from "radix-icons-svelte";

  export let data: PageData;

  // async function signInWithFacebook() {
  //   await data.supabase.auth.signInWithOAuth({
  //     provider: "facebook",
  //     options: {
  //       redirectTo: `${window.location.origin}/auth/callback`,
  //     },
  //   });
  // }

  async function signInWithGoogle() {
    await data.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function signOut() {
    await data.supabase.auth.signOut({});
  }

  // let className: string | undefined | null = undefined;
  // export { className as class };

  let isLoading = false;
  async function onSubmit() {
    isLoading = true;

    setTimeout(() => {
      isLoading = false;
    }, 3000);
  }
</script>

<div
  class="container relative flex h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
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
      Pocket Note
    </div>
    <div class="relative z-20 mt-auto">
      <blockquote class="space-y-2">
        <p class="text-lg">
          &ldquo;I love the design of this app. It's a nice refreshing look to
          my workspace&rdquo;
        </p>
        <footer class="text-sm">Pepito</footer>
      </blockquote>
    </div>
  </div>
  <div class="lg:p-8">
    <div
      class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
    >
      <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
      </div>
      <Button
        on:click={() => signInWithGoogle()}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {#if isLoading}
          <Symbol class="mr-2 h-4 w-4 animate-spin" />
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0.98em"
            height="1em"
            viewBox="0 0 256 262"
            class="mr-2"
            ><path
              fill="currentColor"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            /><path
              fill="currentColor"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            /><path
              fill="currentColor"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
            /><path
              fill="currentColor"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            /></svg
          >
        {/if}
        {" "}
        Sign In with Google
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
    </div>
  </div>
</div>
