# Make orbitalsimulatorhub.com Live

Your domain is on **Namecheap**. Right now it points to Namecheap’s parking page. To show your Orbital Simulator Hub site, you need to:

1. **Deploy the site** to a host (Vercel or Netlify — both free).
2. **Point the domain** at that host in Namecheap DNS.

---

## Step 1: Deploy the site

### Option A: Vercel (recommended)

1. Push your project to **GitHub** (if it isn’t already).
2. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
3. Click **Add New… → Project** and **import** your repo (`satellite_simulator_web` or the repo that contains it).
4. Leave the settings as is (Vercel will use the repo’s `vercel.json`):
   - **Build Command:** `npm run build:client`
   - **Output Directory:** `client/dist`
5. Click **Deploy**. Wait until the deployment finishes.
6. You’ll get a URL like `your-project.vercel.app`. Open it to confirm the site works.

### Option B: Netlify

1. Push your project to **GitHub** (if it isn’t already).
2. Go to [netlify.com](https://netlify.com) and sign in (e.g. with GitHub).
3. Click **Add new site → Import an existing project** and connect your repo.
4. Netlify will read `netlify.toml` from the repo:
   - **Build command:** `npm run build:client`
   - **Publish directory:** `client/dist`
5. Click **Deploy site**. You’ll get a URL like `random-name.netlify.app`. Open it to confirm.

---

## Step 2: Connect orbitalsimulatorhub.com in the host

### If you used Vercel

1. In the Vercel dashboard, open your project.
2. Go to **Settings → Domains**.
3. Add:
   - `orbitalsimulatorhub.com`
   - `www.orbitalsimulatorhub.com`
4. Vercel will show you the DNS records it expects. Keep this tab open for Step 3.

### If you used Netlify

1. In the Netlify dashboard, open your site.
2. Go to **Domain management → Add custom domain** (or **Add domain**).
3. Add:
   - `orbitalsimulatorhub.com`
   - `www.orbitalsimulatorhub.com`
4. Netlify will show recommended DNS records. Keep this for Step 3.

---

## Step 3: Update DNS in Namecheap

In **Namecheap**: **Domain List → Manage** for **orbitalsimulatorhub.com** → **Advanced DNS**.

Do this:

1. **Remove** the current **URL Redirect** for `@` (root) if it points to the parking page or www.
2. **Remove** the **CNAME** for `www` that points to `parkingpage.namecheap.com`.
3. **Add** the records your host (Vercel or Netlify) tells you. Typically:

   **For Vercel:**

   | Type  | Host | Value                    |
   |-------|------|--------------------------|
   | A     | `@`  | `76.76.21.21`            |
   | CNAME | `www`| `cname.vercel-dns.com.`  |

   (Use the exact values shown in your Vercel **Domains** page; they can change.)

   **For Netlify:**

   | Type  | Host | Value                         |
   |-------|------|-------------------------------|
   | A     | `@`  | `75.2.60.5` (or LB shown)     |
   | CNAME | `www`| `your-site.netlify.app`       |

   (Use the exact values from **Domain management** in Netlify.)

4. **TTL:** You can leave 30 min or set to **Automatic** if the host allows.
5. **Save** the DNS changes.

---

## Step 4: Wait and check

- DNS can take from a few minutes up to 24–48 hours.
- In Vercel/Netlify, the domain should show as “Verified” or “Active” once DNS has propagated.
- Open **https://orbitalsimulatorhub.com** and **https://www.orbitalsimulatorhub.com** in your browser; both should show your Orbital Simulator Hub site.

---

## Optional: HTTPS

- **Vercel** and **Netlify** provide free HTTPS and will issue a certificate for your custom domain once DNS is correct. No extra step needed.
- If the host asks, choose “Use host’s nameservers” or “Use host’s SSL”; avoid “Turn off SSL” so the site stays on HTTPS.

---

## Summary

| Step | What to do |
|------|------------|
| 1    | Deploy the repo to Vercel or Netlify (use `build:client` and `client/dist`). |
| 2    | In the host, add domains `orbitalsimulatorhub.com` and `www.orbitalsimulatorhub.com`. |
| 3    | In Namecheap Advanced DNS: remove parking/redirect, add the A and CNAME records the host shows. |
| 4    | Wait for DNS; then open https://orbitalsimulatorhub.com to confirm it’s live. |

If you tell me whether you’re using Vercel or Netlify, I can give the exact A/CNAME values to paste into Namecheap (they’re also shown in the host’s dashboard).
