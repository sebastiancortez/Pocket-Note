<script>
  import "../app.pcss";

  import { invalidate } from "$app/navigation";

  const { data: propsData } = $props();

  $effect(() => {
    const { data } = propsData.supabase.auth.onAuthStateChange(
      (_, newSession) => {
        if (newSession?.expires_at !== propsData.session?.expires_at) {
          invalidate("supabase:auth");
        }
      }
    );

    return () => data.subscription.unsubscribe();
  });
</script>

<slot></slot>
