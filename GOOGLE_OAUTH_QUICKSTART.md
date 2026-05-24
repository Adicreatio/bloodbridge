# Google OAuth Quick Start (5 Minutes)

## TL;DR - What You Need To Do

### Step 1: Get Google Credentials (2 minutes)

1. Go to: https://console.cloud.google.com/
2. Create new project or select existing one
3. Go to APIs & Services → Credentials
4. Click "Create Credentials" → "OAuth Client ID" → "Web Application"
5. Add authorized redirect URI: `http://localhost:3000/auth/callback`
6. Copy the **Client ID** and **Client Secret**

### Step 2: Add to Supabase (1 minute)

1. Go to your Supabase project
2. Authentication → Providers → Google
3. Paste Client ID and Client Secret
4. Click Save

### Step 3: Test It (2 minutes)

```bash
cd /vercel/share/v0-project
pnpm dev
```

Go to: http://localhost:3000/auth/login
Click "Sign in with Google"
✅ Done!

---

## What's Already Done

✅ Login page has "Sign in with Google" button  
✅ Sign-up page has "Sign up with Google" button  
✅ OAuth callback handler ready (`/auth/callback`)  
✅ Error handling and redirects working  
✅ UI/UX matches BloodBridge theme  

## Files Modified/Created

```
lib/
└── google-auth.ts (new)

app/
├── auth/
│   ├── login/page.tsx (updated)
│   ├── sign-up/page.tsx (updated)
│   └── callback/route.ts (new)

docs/
├── GOOGLE_OAUTH_SETUP.md (detailed guide)
├── GOOGLE_AUTH_IMPLEMENTATION.md (technical details)
├── GOOGLE_OAUTH_CHECKLIST.md (full checklist)
└── GOOGLE_OAUTH_QUICKSTART.md (this file)
```

## Production Setup (5 more minutes)

After testing locally:

1. Create OAuth credentials for production domain
2. Update Google Console with production redirect URI: `https://yourdomain.com/auth/callback`
3. Add production Client ID/Secret to Supabase
4. Deploy code to production
5. Test on production domain

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Redirect URI mismatch" | Make sure `http://localhost:3000/auth/callback` is in Google Console |
| "OAuth not configured" | Enable Google provider in Supabase before adding credentials |
| Page stays blank on redirect | Check environment variables are set in `.env.local` |
| OAuth button doesn't work | Clear browser cache and cookies, try incognito mode |

---

## How It Works

```
User clicks "Sign in with Google"
        ↓
signInWithGoogle() (lib/google-auth.ts)
        ↓
Redirect to Google login
        ↓
User authenticates with Google
        ↓
Google redirects to http://localhost:3000/auth/callback?code=...
        ↓
OAuth callback handler exchanges code for session
        ↓
User logged in, redirect to /dashboard
        ↓
✅ Done!
```

---

## User Experience Flow

### Sign In (Returning User)
1. User goes to `/auth/login`
2. Clicks "Sign in with Google"
3. Authenticates with Google
4. Redirected to `/dashboard`
5. Logged in!

### Sign Up (New User)
1. User goes to `/auth/sign-up`
2. Clicks "Sign up with Google"
3. Authenticates with Google
4. Account automatically created
5. Redirected to `/dashboard`
6. Logged in!

---

## Code Example

Sign-in is as simple as:

```typescript
import { signInWithGoogle } from '@/lib/google-auth'

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle()
    // User will be redirected automatically
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}
```

---

## Next Steps

1. Follow Step 1-3 above to configure Google OAuth
2. Read `GOOGLE_OAUTH_SETUP.md` for detailed setup instructions
3. Use `GOOGLE_OAUTH_CHECKLIST.md` to track your progress
4. Deploy to production following production section above
5. Done! Users can now sign in with Google

---

## Questions?

- See `GOOGLE_OAUTH_SETUP.md` for detailed setup
- See `GOOGLE_AUTH_IMPLEMENTATION.md` for technical details
- See `GOOGLE_OAUTH_CHECKLIST.md` for complete checklist

Happy coding! 🎉
