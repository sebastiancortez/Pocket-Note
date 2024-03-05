<script lang="ts">
  import { InstagramLogo, Symbol } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { cn } from "$lib/utils";

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

<div class={cn("grid gap-6", className)} {...$$restProps}>
  <!-- <form on:submit|preventDefault={onSubmit}>
    <div class="grid gap-2">
      <div class="grid gap-1">
        <Label class="sr-only" for="email">Email</Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autocapitalize="none"
          autocomplete="email"
          autocorrect="off"
          disabled={isLoading}
        />
      </div>
      <Button disabled={isLoading}>
        {#if isLoading}
          <SymbolIcon class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Sign In with Email
      </Button>
    </div>
  </form>
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t" />
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-background px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
  </div> -->
  <!-- <Button on:click={() => signInwithFacebook()} variant="outline" type="button" disabled={isLoading}>
    {#if isLoading}
      <Symbol class="mr-2 h-4 w-4 animate-spin" />
    {:else} -->
  <!-- <InstagramLogo class="mr-2 h-4 w-4" /> -->
  <!-- <svg
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
  </Button> -->
</div>
