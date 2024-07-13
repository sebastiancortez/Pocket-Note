<script lang="ts">
  import type { PageData } from "./$types";
  import MessageForm from "./MessageForm.svelte";

  export let data: PageData;
</script>

<MessageForm data={data.form} />
