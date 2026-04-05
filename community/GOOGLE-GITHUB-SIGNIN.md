# Google & GitHub sign-in setup

The community app now has **Continue with Google** and **Continue with GitHub** on both Sign in and Sign up. To make them work, enable the providers in Supabase and add the redirect URL.

---

## 1. Enable Google and GitHub in Supabase

1. Open **Supabase Dashboard** → your project → **Authentication** → **Providers**.
2. **Google**
   - Turn **Google** on.
   - You need a **Google OAuth client** (Google Cloud Console):
     - Create a project or use an existing one.
     - **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**.
     - Application type: **Web application**.
     - Authorized redirect URIs: add  
       `https://srxtknwdlitqrswnlfxl.supabase.co/auth/v1/callback`  
       (use your project’s Supabase URL: `https://<project-ref>.supabase.co/auth/v1/callback`).
     - Copy **Client ID** and **Client secret** into Supabase Google provider.
   - Save.
3. **GitHub**
   - Turn **GitHub** on.
   - In **GitHub**: **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
     - Authorization callback URL:  
       `https://srxtknwdlitqrswnlfxl.supabase.co/auth/v1/callback`  
       (again, use your project’s Supabase URL).
     - Copy **Client ID** and generate **Client secret**.
   - Paste them into Supabase GitHub provider.
   - Save.

---

## 2. Redirect URLs (Authentication → URL Configuration)

**If you see "Page not found" after clicking Google or GitHub**, the callback URL Supabase sends users to is not served by this app. Fix it like this:

1. **Use the same origin as this app.** Open sign-in at the URL where this Next.js app runs (e.g. `http://localhost:3001/sign-in` for dev). Do not use a different site (e.g. main marketing site) for sign-in if that site does not have the `/auth/callback` route.
2. **Allow the callback URL in Supabase.**

In **Authentication** → **URL Configuration**:

- **Site URL:** set to the exact origin where this app runs (e.g. `http://localhost:3001` for dev, or `https://community.orbitalsimulatorhub.com` for prod). No trailing slash.
- **Redirect URLs:** add **both** of these (or your actual origins):
  - `http://localhost:3001/auth/callback`
  - Your production callback, e.g. `https://community.orbitalsimulatorhub.com/auth/callback`

Supabase will only redirect to URLs that are in this list. Use the same origin (scheme + host + port) as in the address bar when you click "Sign in with Google".

Save.

---

## 3. Optional: better display names for OAuth users

By default, new users get a profile with `display_name` from email or metadata. To prefer Google/GitHub names, run this once in **SQL Editor** (optional):

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      NEW.raw_user_meta_data->>'user_name',
      'user_' || substr(replace(NEW.id::text, '-', ''), 1, 12)
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'display_name',
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'email'
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

After step 1 and 2, **Continue with Google** and **Continue with GitHub** will work. New OAuth users get a profile automatically and are redirected to onboarding or channels.
