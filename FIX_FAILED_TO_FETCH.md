# Fix "Failed to Fetch" Error - Quick Steps

## 🚀 Do This RIGHT NOW (5 minutes)

### Step 1: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
pnpm dev
```

### Step 2: Clear Browser Cache
1. Open DevTools: `F12`
2. Go to **Application** tab
3. Click **Storage** → **Clear site data**
4. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Step 3: Check Console Logs
1. Open DevTools: `F12` → **Console** tab
2. Click "Sign in with Google" button
3. Look for logs starting with `[v0]`
4. **Screenshot the error and read it carefully**

---

## ✅ If You See These Logs - You're FIXED!

```
[v0] Starting Google OAuth flow with redirect URL: http://localhost:3000/auth/callback
```

Then you'll be redirected to Google login - **that's success!**

---

## ❌ If You See These Logs - Fix the Issue

| Log Message | Fix |
|---|---|
| `[v0] Google OAuth error: Invalid client` | Your Google OAuth credentials in Supabase are wrong |
| `[v0] Google OAuth error: redirect_uri_mismatch` | Your redirect URI isn't in Google Cloud Console |
| `[v0] No URL returned from Google OAuth` | Google provider isn't enabled in Supabase |
| No logs at all | Browser cache issue - clear and refresh |

---

## 🔧 Most Common Fix (90% of cases)

### Problem: Google credentials not in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click your project
3. Go to **Authentication** (left sidebar)
4. Click **Providers**
5. Find **Google** and click it
6. Make sure it says **Enabled** (toggle it on)
7. Paste your Google **Client ID**
8. Paste your Google **Client Secret**
9. Click **Save**
10. Refresh your app and try again

**Where to get Google credentials:** [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client IDs (Web application)

---

## 🔗 Second Most Common Fix (8% of cases)

### Problem: Redirect URI not in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click your **OAuth 2.0 Client ID**
5. Under "Authorized redirect URIs", add:
   ```
   http://localhost:3000/auth/callback
   ```
6. Click **Save**
7. Wait 30 seconds
8. Refresh your app and try again

---

## 🧠 Third Most Common Fix (1% of cases)

### Problem: Supabase project is paused

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Look at your project card
3. If it says **"Paused"**, click it
4. Click **Resume Project**
5. Wait 2 minutes
6. Refresh your app and try again

---

## 📋 Final Checklist

Before you think it's broken, check these:

- [ ] Dev server restarted (`pnpm dev`)
- [ ] Browser cache cleared (`Ctrl+Shift+R`)
- [ ] Looking at console for `[v0]` logs
- [ ] Google provider is **Enabled** in Supabase
- [ ] Google Client ID in Supabase
- [ ] Google Client Secret in Supabase
- [ ] `http://localhost:3000/auth/callback` in Google Redirect URIs
- [ ] Supabase project is not paused

---

## 💬 What To Do If Still Broken

1. **Look at the error message** in browser console
2. **Search Google** for that specific error
3. **Read** GOOGLE_OAUTH_TROUBLESHOOTING.md (full debugging guide)
4. **Check** [Supabase docs](https://supabase.com/docs/guides/auth/social-login/auth-google)

---

## ✨ Once It Works

You should see:
1. Click "Sign in with Google"
2. Redirected to Google login page
3. User signs in
4. Auto-redirected back to your app
5. Auto-redirected to `/dashboard`
6. **User is logged in!** ✅

