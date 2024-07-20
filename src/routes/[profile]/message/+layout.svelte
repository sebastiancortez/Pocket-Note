<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div class="absolute inset-0 bg-gradient-radial from-gray-800 to-gray-900">
  <slot />
</div>

<svelte:head>
  <title>Threlte</title>
</svelte:head>
