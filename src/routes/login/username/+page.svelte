<script lang="ts">
  import SuperDebug from "sveltekit-superforms";
  import type { PageData } from "./$types.js";
  import UsernameForm from "./UsernameForm.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";

  export let data: PageData;

  function redirectToProfile() {
    goto("/profile");
  }
</script>

{#if data.hasUsername}
  <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <p class="text-lg">
      You already have a username {data.userProfile?.username}. Go to your
      profile.
    </p>
    <Button on:click={redirectToProfile}>Go to profile</Button>
  </div>
{:else}
  <UsernameForm data={data.form} />
{/if}
