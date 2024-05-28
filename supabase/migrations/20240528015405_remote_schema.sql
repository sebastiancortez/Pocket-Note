alter table "public"."messages" enable row level security;

alter table "public"."social_auths" enable row level security;

alter table "public"."user_links" enable row level security;

alter table "public"."users" enable row level security;

create policy "Enable insert for users based on user_id"
on "public"."users"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));



