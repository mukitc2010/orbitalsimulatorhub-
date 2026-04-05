# Connect LinkedIn for OpenClaw Auto-Posting

When OpenClaw runs `npm run openclaw:update` with `POST_TO_SOCIAL=1`, it will post your latest blog to LinkedIn.

---

## Step 1: Create a LinkedIn App

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
2. Click **Create app**
3. Fill in the form with these exact values:

| Field | Value |
|-------|-------|
| **App name** | `OrbitalSimulatorHub` |
| **LinkedIn Page** | For individual developers: click "here" in the form to see default Company pages, then select the one for your products. Or use **Create a new LinkedIn Page** to create a page for OrbitalSimulatorHub. |
| **Privacy policy URL** | `https://www.orbitalsimulatorhub.com/privacy-policy` |
| **App logo** | Optional — upload a square image (≥100px) if you have one |
| **Legal agreement** | Check "I have read and agree to these terms" |

4. Click **Create app**
5. After creation, go to **Auth** tab and note:
   - **Client ID**
   - **Client Secret**

---

## Step 2: Request Permissions

1. In your app, go to **Products** tab
2. Request **Share on LinkedIn** (or **Marketing Developer Platform**)
3. Wait for approval (usually instant for basic posting)
4. Under **Auth** → **OAuth 2.0 scopes**, ensure `w_member_social` is checked

---

## Step 3: Get Your Access Token

LinkedIn uses OAuth 2.0. You need to authorize once to get a token.

### Option A: Manual (browser)

1. Build this URL (replace `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI`):
   ```
   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=w_member_social
   ```
2. Add redirect URI in your app: **Auth** → **Authorized redirect URLs** → add `http://localhost:3000/callback` (or a URL you control)
3. Open the URL in a browser, sign in, approve
4. You'll be redirected to `YOUR_REDIRECT_URI?code=XXXX`
5. Exchange the code for a token:
   ```bash
   curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
     -d "grant_type=authorization_code" \
     -d "code=THE_CODE_FROM_URL" \
     -d "redirect_uri=http://localhost:3000/callback" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET"
   ```
6. Save the `access_token` from the response

### Option B: Use the token script (easiest)

1. Add to `.env`:
   ```
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   ```

2. In your LinkedIn app, add `http://localhost:3999/callback` to **Auth** → **Authorized redirect URLs**

3. Run:
   ```bash
   node scripts/linkedin-get-token.js
   ```

4. Open the URL it prints in your browser, sign in, approve. The token will appear in the terminal and on the page. Copy it to `.env` as `LINKEDIN_ACCESS_TOKEN`.

---

## Step 4: Add to .env

Create or edit `.env` in the project root:

```
POST_TO_SOCIAL=1
LINKEDIN_ACCESS_TOKEN=your_access_token_here
```

**Important:** LinkedIn access tokens expire in ~60 days. You'll need to refresh it periodically. For long-term automation, consider using a refresh token flow or a service like Zapier/Buffer.

---

## Step 5: Enable in OpenClaw

When running the update:

```powershell
$env:POST_TO_SOCIAL="1"
npm run openclaw:update
```

Or add to your cron message: "Set POST_TO_SOCIAL=1, then run npm run openclaw:update"

---

## What Gets Posted

The script posts your **latest blog post** to LinkedIn:

- **Text:** Title + excerpt + link to the full article
- **Link:** `https://www.orbitalsimulatorhub.com/blog/{slug}`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 401 Unauthorized | Token expired. Get a new token (Step 3). |
| 403 Forbidden | Check `w_member_social` scope is approved. |
| Invalid redirect_uri | Must match exactly what's in your LinkedIn app settings. |
| Token expires | LinkedIn tokens last ~60 days. Re-run OAuth to get a new one. |
