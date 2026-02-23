# Specification

## Summary
**Goal:** Fix admin login authentication failing with invalid credentials error for username 'admin' and password 'admin123'.

**Planned changes:**
- Debug and fix backend authentication endpoint in backend/main.mo to correctly validate admin credentials
- Verify frontend AdminLoginPage.tsx sends credentials correctly and handles authentication response properly
- Add console logging to frontend login submission and backend authentication handler to diagnose credential validation failure

**User-visible outcome:** Admin can successfully login with username 'admin' and password 'admin123' and access the admin dashboard without invalid credentials error.
