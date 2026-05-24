# Google OAuth "Failed to Fetch" Troubleshooting Guide

## Issue: "Failed to fetch" error when clicking "Sign in with Google"

This guide helps you diagnose and fix the "failed to fetch" error in Google OAuth implementation.

---

## Common Causes & Solutions

### 1. ✅ Missing or Incorrect Environment Variables

**Symptoms:**
- Blank console logs
- "Failed to fetch" error immediately
- Request doesn't reach Google

**Check Your Environment:**
```bash
# Verify these variables are set
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
echo $NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL  # (optional)
```

**Solution:**
1. Go to Supabase Dashboard → Settings → API
2. Copy `Project URL` and `Anon Key`
3. Add to your environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Restart dev server: `pnpm dev`

---

### 2. ✅ Google OAuth Not Configured in Supabase

**Symptoms:**
- Request goes through but redirects to error page
- "Invalid client" error in console
- 401 Unauthorized from Supabase

**Solution:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and enable it
5. Add your Google OAuth Credentials:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)
6. Save changes
7. Refresh your app and try again

---

### 3. ✅ Incorrect Redirect URI in Google Cloud Console

**Symptoms:**
- Error: "redirect_uri_mismatch"
- User redirected to error page with URI mismatch message
- OAuth window closes unexpectedly

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID (Web application)
5. Under "Authorized redirect URIs", add:
   ```
   https://your-supabase-project.supabase.co/auth/v1/callback
   ```
6. For local development, also add:
   ```
   http://localhost:3000/auth/callback
   ```
7. Click **Save**
8. Refresh your app and try again

---

### 4. ✅ CORS Issues (Cross-Origin Request Blocked)

**Symptoms:**
- Browser console shows CORS error
- Network tab shows failed request to Google
- Message: "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
- This is usually NOT your fault - it's a browser security feature
- Make sure you're redirecting to `window.location.href = url` (not making a fetch)
- Check that the code has this fix:
  ```typescript
  const { url } = await signInWithGoogle()
  if (url) {
    window.location.href = url  // ← This is the fix
  }
  ```

---

### 5. ✅ Supabase Project Paused

**Symptoms:**
- "Failed to fetch" immediately
- All auth requests fail
- Error message mentions "project" or "disabled"

**Solution:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Check if your project is showing as "Paused"
3. Click the project and select **Resume Project**
4. Wait 1-2 minutes for it to restart
5. Refresh your app and try again

---

### 6. ✅ Network Request Not Reaching API

**Symptoms:**
- Console shows no logs from `[v0]` prefixed messages
- "Failed to fetch" with no other error details
- Request timeout errors

**Solution:**
1. Open Browser DevTools → **Console** tab
2. Try signing in with Google again
3. Look for messages starting with `[v0]`
4. If you see them, the code is working - check Supabase config
5. If no logs appear, clear browser cache:
   - DevTools → Application → Cache Storage
   - Delete all cached data
   - Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)

---

### 7. ✅ Callback Route Not Working

**Symptoms:**
- OAuth completes but redirects to error page
- "exchangeCodeForSession" error in logs
- Session not created after Google auth

**Solution:**
1. Verify `/app/auth/callback/route.ts` exists
2. Check it has this content:
   ```typescript
   const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
   ```
3. Verify server Supabase client is being used (not browser client)
4. Restart dev server: `pnpm dev`

---

## Debugging Steps

### Step 1: Check Browser Console for Logs
Open DevTools (F12) → **Console** tab and look for messages starting with `[v0]`:
- `[v0] Starting Google OAuth flow...` ← Code is running
- `[v0] Google OAuth error...` ← Error details will follow
- `[v0] No URL returned...` ← Supabase misconfigured

### Step 2: Check Network Tab
1. Open DevTools → **Network** tab
2. Click "Sign in with Google"
3. Look for requests to:
   - `supabase.co` (should succeed)
   - `accounts.google.com` (should redirect)
4. Check response status codes:
   - 200 = OK
   - 401 = Unauthorized (check credentials)
   - 403 = Forbidden (check redirect URI)
   - 500 = Server error (check Supabase)

### Step 3: Verify Environment Variables
```bash
# In your project directory
cat .env.local  # or wherever your env vars are

# You should see:
# NEXT_PUBLIC_SUPABASE_URL=https://...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Step 4: Test with curl (Advanced)
```bash
# Test Supabase is reachable
curl https://your-project.supabase.co/auth/v1/version

# You should get a response like:
# {"version":"1.x.x"}
```

---

## Quick Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set and valid
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set and valid
- [ ] Google provider is ENABLED in Supabase
- [ ] Google OAuth Client ID is in Supabase
- [ ] Google OAuth Client Secret is in Supabase
- [ ] `https://your-project.supabase.co/auth/v1/callback` is in Google Redirect URIs
- [ ] `http://localhost:3000/auth/callback` is in Google Redirect URIs (for local testing)
- [ ] Supabase project is not paused
- [ ] Dev server restarted after env changes (`pnpm dev`)
- [ ] Browser cache cleared (Ctrl+Shift+R)

---

## Still Having Issues?

1. **Check the docs:** [Supabase Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)
2. **Check your logs:** Browser DevTools → Console tab
3. **Try incognito window:** Rules out cache issues
4. **Check Supabase status:** [status.supabase.com](https://status.supabase.com)

---

## What "Failed to Fetch" Really Means

This error is very generic and can mean many things:

| If you see... | It likely means... |
|---|---|
| `[v0] Starting Google OAuth...` in console | ✅ Code is working, issue is with Supabase config |
| No `[v0]` logs at all | ❌ JavaScript error or cache issue |
| `[v0] Google OAuth error: Invalid client` | ❌ Google credentials wrong in Supabase |
| `[v0] Google OAuth error: redirect_uri_mismatch` | ❌ Redirect URI not in Google Cloud Console |
| Network request to `accounts.google.com` fails | ❌ CORS or network issue |

---

## Success Indicators

After fixing the issue, you should see:
1. Click "Sign in with Google"
2. `[v0] Starting Google OAuth flow...` in console
3. Redirect to Google login page
4. User logs in
5. Redirect back to your app
6. Auto-redirect to `/dashboard`
7. ✅ User is logged in!

---

## Production Deployment

Before deploying to production:
1. Add production Supabase URL to Google Redirect URIs:
   ```
   https://your-domain.com/auth/callback
   ```
2. Update `NEXT_PUBLIC_SUPABASE_URL` to production URL
3. Update `NEXT_PUBLIC_SUPABASE_ANON_KEY` to production key
4. Ensure all environment variables are set in Vercel
5. Test once more before going live

