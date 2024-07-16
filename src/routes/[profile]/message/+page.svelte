<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div
  style="display: flex; justify-content: center; align-items: center; height: 100vh;"
>
  <strong>{data.randomMessage?.content}</strong>
</div>
