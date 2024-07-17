<script lang="ts">
  import type { PageData } from "./$types";
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/components/scene.svelte";

  export let data: PageData;
</script>

<div class="flex justify-center items-center h-screen">
  <strong class="text-gray-100">{data.randomMessage?.content}</strong>
</div>

<Canvas>
  <Scene />
</Canvas>
