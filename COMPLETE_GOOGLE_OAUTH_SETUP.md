# Complete Google OAuth Setup Guide - Step by Step

## Overview

This guide will walk you through setting up Google OAuth for BloodBridge in exactly 10 minutes.

**Time estimate:** 10 minutes  
**Difficulty:** Beginner friendly  
**Requirements:** Google account, Supabase account, code editor

---

## Part 1: Get Google OAuth Credentials (5 minutes)

### Step 1.1: Go to Google Cloud Console
1. Open https://console.cloud.google.com
2. Sign in with your Google account
3. Click **Select a Project** (top left)
4. Click **NEW PROJECT**
5. Project name: `BloodBridge`
6. Click **CREATE**
7. Wait for project to be created (takes ~30 seconds)

### Step 1.2: Enable Google Sign-In API
1. In Google Cloud Console, search for `Google+ API`
2. Click **Google+ API**
3. Click **ENABLE**
4. Wait for it to enable

### Step 1.3: Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials** (left sidebar)
2. Click **Create Credentials** (top blue button)
3. Select **OAuth 2.0 Client ID**
4. You may need to create a consent screen first:
   - Click **Configure OAuth Consent Screen**
   - Select **External** → **CREATE**
   - Fill in:
     - **App name:** BloodBridge
     - **User support email:** your-email@gmail.com
     - **Developer contact:** your-email@gmail.com
   - Click **SAVE AND CONTINUE**
   - Click **SAVE AND CONTINUE** (skip optional sections)
   - Click **BACK TO CREDENTIALS**

### Step 1.4: Create the OAuth 2.0 Client
1. Click **Create Credentials** again
2. Select **OAuth 2.0 Client ID**
3. Select **Web application**
4. Name: `BloodBridge Web`
5. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:3000/auth/callback
   https://your-supabase-project.supabase.co/auth/v1/callback
   ```
   (Replace `your-supabase-project` with your actual Supabase project name)
6. Click **CREATE**
7. You'll see a dialog with:
   - **Client ID** (copy this)
   - **Client Secret** (copy this)
8. Click **DOWNLOAD** to save the JSON file (backup)
9. Click **CLOSE**

**✅ You now have:**
- Client ID: `xxx.apps.googleusercontent.com`
- Client Secret: `GOCSPX-xxx`

---

## Part 2: Configure Supabase (3 minutes)

### Step 2.1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Sign in
3. Click your BloodBridge project

### Step 2.2: Enable Google Provider
1. Left sidebar → **Authentication**
2. Click **Providers**
3. Find **Google** and click it
4. Toggle **Enabled** to ON (switch should be blue)
5. Paste your Google **Client ID**
6. Paste your Google **Client Secret**
7. Click **SAVE**

**✅ Google OAuth is now configured in Supabase!**

---

## Part 3: Test Locally (2 minutes)

### Step 3.1: Restart Your Dev Server
```bash
# In your BloodBridge project directory
pnpm dev
```

### Step 3.2: Test the Login
1. Open http://localhost:3000/auth/login
2. Click **Sign in with Google** button
3. You should be redirected to Google login
4. Sign in with your Google account
5. Grant permissions
6. You should be redirected back to your app
7. **✅ You're logged in!**

---

## Troubleshooting

### "redirect_uri_mismatch" error
**Solution:** Check you added the correct redirect URI in Google Cloud Console
```
http://localhost:3000/auth/callback
```

### "Invalid client" error
**Solution:** Check your Client ID and Secret are correct in Supabase

### "Failed to fetch" with no logs
**Solution:** 
1. Restart dev server: `pnpm dev`
2. Clear browser cache: `Ctrl+Shift+R`
3. Check browser console for `[v0]` logs

### Nothing happens when I click the button
**Solution:** Open browser DevTools (F12) → Console and look for error messages

---

## Important URLs to Remember

| Service | URL |
|---|---|
| Google Cloud Console | https://console.cloud.google.com |
| Supabase Dashboard | https://supabase.com/dashboard |
| BloodBridge Login | http://localhost:3000/auth/login |
| BloodBridge SignUp | http://localhost:3000/auth/sign-up |

---

## What's Actually Happening (Technical Overview)

1. **User clicks "Sign in with Google"**
   - Our code calls `signInWithGoogle()`
   
2. **Your app redirects to Supabase**
   - Supabase receives the OAuth request
   - Supabase knows about your Google credentials
   
3. **Supabase redirects to Google**
   - User sees Google login page
   - User logs in with Google
   
4. **Google redirects back to your app**
   - Google sends an authorization code
   - Your app hits the `/auth/callback` route
   
5. **Callback route exchanges code for session**
   - Uses the server Supabase client
   - Saves session to cookies
   
6. **User is logged in!**
   - Redirects to `/dashboard`
   - Session is stored and persistent

---

## Next Steps

1. **Test email/password login** to make sure it still works
2. **Test sign-up** to make sure users can create accounts
3. **Check the dashboard** appears correctly when logged in
4. **Test logout** to make sure sessions work

---

## Files Modified/Created

- `lib/google-auth.ts` - OAuth utility
- `app/auth/login/page.tsx` - Login page with Google button
- `app/auth/sign-up/page.tsx` - Sign-up page with Google button
- `app/auth/callback/route.ts` - OAuth callback handler

---

## Production Deployment

When you deploy to production:

1. Add production redirect URI to Google:
   ```
   https://your-domain.com/auth/callback
   ```

2. Update environment variables in Vercel:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
   ```

3. Test once more before going live

---

## Questions?

- **Google OAuth docs:** https://developers.google.com/identity/protocols/oauth2
- **Supabase Google Auth:** https://supabase.com/docs/guides/auth/social-login/auth-google
- **Troubleshooting:** See FIX_FAILED_TO_FETCH.md

---

## Summary

✅ Got Google OAuth credentials  
✅ Configured Supabase  
✅ Tested locally  
✅ Ready to deploy  

**Your BloodBridge app now has Google Sign-In!**

