<script lang="ts">
  import type { LayoutData } from "./$types";

  const { children, data } = $props()
</script>

<div class="absolute inset-0 bg-gradient-radial from-gray-800 to-gray-900">
  {@render children()}
</div>

<svelte:head>
  <title>Threlte</title>
</svelte:head>
