<script lang="ts">
  import type { PageData } from "./$types";
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/components/scene.svelte";

  export let data: PageData;
</script>

<div class="relative w-full h-screen">
  <p
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
  >
    {data.randomMessage?.content}
  </p>
  <div class="absolute inset-0 z-0">
    <Canvas>
      <Scene />
    </Canvas>
  </div>
</div>
