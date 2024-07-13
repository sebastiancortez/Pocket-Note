<script lang="ts">
  import type { PageData } from "./$types";
  import MessageForm from "./MessageForm.svelte";

  export let data: PageData;
</script>

{#if data.form}
  <MessageForm data={data.form} />
{:else}
  <div class="error-message">Form data is missing.</div>
{/if}
