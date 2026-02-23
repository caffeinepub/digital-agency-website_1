# Specification

## Summary
**Goal:** Rebuild the CodeCrafter website to run on the Internet Computer platform by migrating the backend from Express/Node.js to Motoko while preserving all existing functionality, branding, and UI components.

**Planned changes:**
- Migrate backend to Motoko single-actor architecture (backend/main.mo) with all existing authentication, user profile management, role-based access control, and inquiry submission endpoints
- Update frontend React application to interface with Motoko backend through useActor and useQueries hooks
- Configure project for Internet Computer deployment with dfx.json for both backend and frontend canisters
- Ensure Internet Identity authentication integration works correctly
- Preserve all CodeCrafter branding, coral and charcoal color scheme, typography, responsive layouts, and visual design system
- Maintain all existing UI components (HeroSection, ServicesSection, PortfolioSection, AboutSection, ContactSection, Layout)

**User-visible outcome:** Users can access the CodeCrafter website deployed on Internet Computer via ic0.app domain with all original functionality intact - browse services, view portfolio, submit inquiries through the contact form, and admins can log in to manage user profiles and view submissions. The site maintains its complete visual identity and responsive design.
