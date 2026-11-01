# Community

ID: `community`. Group: product.

Owns the member app in `community/`: pages, chat UI, auth callback, and Supabase schema. A member sees only the rows the row-level security policy allows. The anon key may ship to the browser. The service-role key must not.

Owns `community/app/**`, `community/components/**`, `community/lib/**`, `community/supabase/**`, and `community/middleware.ts`.

Does not change the public marketing site to finish a community screen. Does not disable RLS to make a query return rows.

Check: `npm run build --prefix community`. Walk the changed flow: sign-in, the screen that reads the new data, and one screen that must not show another member's private row.
