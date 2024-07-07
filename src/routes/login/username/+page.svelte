<script lang="ts">
  import type { PageData } from "./$types.js";
  import UsernameForm from "./UsernameForm.svelte";
  export let data: PageData;
</script>

<UsernameForm data={data.form} />
