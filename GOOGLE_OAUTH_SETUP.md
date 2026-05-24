# Google OAuth Setup Guide for BloodBridge

This guide explains how to set up Google OAuth login for your BloodBridge application.

## Steps to Enable Google OAuth

### 1. Create a Google OAuth Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Search for "OAuth consent screen" and click on it
4. Select "External" user type and click "Create"
5. Fill in the consent screen:
   - App name: `BloodBridge`
   - User support email: your email
   - Developer contact: your email
6. Click "Save and Continue" through all scopes (no additional scopes needed)
7. Click "Back to Dashboard"

### 2. Create OAuth Credentials

1. Go to "Credentials" in the left menu
2. Click "Create Credentials" → "OAuth Client ID"
3. Select "Web application"
4. Add Authorized redirect URIs:
   - **Development**: `http://localhost:3000/auth/callback`
   - **Production**: `https://yourdomain.com/auth/callback`
   
   (Replace `yourdomain.com` with your actual production domain)

5. Copy your **Client ID** and **Client Secret**

### 3. Configure Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your BloodBridge project
3. Go to **Authentication** → **Providers**
4. Find and enable **Google**
5. Paste your **Client ID** and **Client Secret** from step 2
6. Set the **Redirect URL** to: `https://YOUR_SUPABASE_URL/auth/v1/callback?provider=google`
   (Replace `YOUR_SUPABASE_URL` with your actual Supabase URL)
7. Click **Save**

### 4. Verify Environment Variables

Make sure these environment variables are set in your project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

For production, also set:
```
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://yourdomain.com/auth/callback
```

## How Google OAuth Works in BloodBridge

1. User clicks "Sign in with Google" on `/auth/login` or "Sign up with Google" on `/auth/sign-up`
2. Redirected to Google login page
3. After authentication, Google redirects to `/auth/callback`
4. The callback route exchanges the code for a session
5. User is redirected to `/dashboard`

## Testing Google OAuth Locally

1. Start your dev server: `pnpm dev`
2. Go to `http://localhost:3000/auth/login`
3. Click "Sign in with Google"
4. You'll be redirected to Google login
5. After login, you should be redirected to `/dashboard`

## Troubleshooting

- **"Redirect URI mismatch" error**: Make sure the redirect URL in Google Cloud Console matches the one in Supabase
- **"OAuth credentials not configured" error**: Check that you've completed the Supabase configuration step
- **User not found after redirect**: This is expected for first-time OAuth users; Supabase creates the user automatically

## Additional Notes

- Google OAuth users don't need email confirmation
- User profile is auto-created on first Google sign-in
- Email from Google account is automatically added to the user record
