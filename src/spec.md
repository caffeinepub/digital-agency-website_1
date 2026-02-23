# Specification

## Summary
**Goal:** Update the client inquiry form with comprehensive fields to capture detailed project information.

**Planned changes:**
- Replace the existing ContactSection form with 9 comprehensive fields: Full Name, Email Address, Phone Number, Company/Business Name, Website Type (dropdown), Features/Requirements (textarea), Budget, Deadline (date picker), and Additional Notes (textarea)
- Remove the old 'Message' field from the contact form
- Create a backend endpoint to handle and store client inquiry submissions with all form fields
- Connect the frontend form to the backend using React Query mutation with loading, success, and error states
- Maintain the existing coral and charcoal design system with responsive layout and smooth transitions

**User-visible outcome:** Users can submit detailed client inquiries through a comprehensive form that captures project requirements, budget, timeline, and business information, with visual feedback during submission.
