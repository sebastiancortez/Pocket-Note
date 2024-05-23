<script lang="ts">
  import type { PageData } from "./$types";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";

  export let data: PageData;
</script>

<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
  <Textarea placeholder="Type your message here." />
  <Button>Send message</Button>
</section>
