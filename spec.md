# Specification

## Summary
**Goal:** Build "Sparkling," a full-featured electrician marketplace web app with role-based access, electrician discovery, bookings, a product marketplace, government contracts, payments/commissions, and multi-role dashboards — all on a dark industrial UI with electric yellow accents.

**Planned changes:**

- **Splash Screen:** Full-viewport animated splash with Sparkling logo (lightning bolt), "Power Your World" tagline, fade-in + scale + electric arc animation, auto-navigates to login after 2.5 seconds.

- **Login Page:** Role selector dropdown (Super Admin, Electrician Admin, Electrician, Customer, Contractor) that auto-fills default demo credentials into visible email/password fields; routes to the correct role-specific dashboard on login.

- **Registration Flows:**
  - Customer/Contractor: single-page form (name, phone, email, password, mandatory location dropdown with 5+ predefined areas).
  - Electrician: 3-step form — personal details, professional details (experience, service categories), document uploads (Aadhar, PAN, certificates, photo). Submitted accounts default to `pending_verification` status and are hidden from customers.

- **Super Admin Dashboard:** Overview metrics, user management table, electrician verification queue (document viewer, approve/reject), revenue & commission tracker, dispute resolution panel, promotional banner management, notification broadcaster.

- **Electrician Admin Dashboard:** Managed electricians list, pending verification actions, payment management per electrician, performance metrics.

- **Electrician Dashboard:** Profile status with verification badge, My Jobs (upcoming/in-progress/completed), Earnings history, My Documents, My Reviews, online/offline availability toggle.

- **Customer Home Screen:** Promotional banner carousel (auto-rotates every 4 seconds, location-targeted), service category icon cards (7 categories), and entry into electrician discovery.

- **Electrician Discovery Page:** Search with location filter, service category filter, and radius selector. Shows verified-only electrician cards (name, photo, star rating, services, location, "Book Now"). Default sort by highest rating.

- **Rating & Recommendation System:** Post-job rating modal (1–5 stars + written review); average rating displayed on cards; electricians below 2.0 stars flagged in admin dashboard.

- **Service Categories Module:** 7 categories (Electrical Repair, Preventive Maintenance, New Installation, Wiring & Rewiring, Panel Upgrade, Emergency Call-out, Industrial Services) as icon cards; clicking filters discovery results.

- **Product Marketplace:** Browse products across 6 categories with image, name, price, stock, and seller info; Add to Cart; cart summary with totals. Super Admin can manage products.

- **Government Contracts Module:** Visible to Contractor and Admin roles; contract listings with full details; contractor application flow (bid amount, team size); status tracking (Submitted, Under Review, Awarded, Rejected); admin can post/edit/close/award contracts.

- **Notifications System:** Bell icon with unread badge in header; notifications panel with type icons and timestamps; mark all as read; backend persists notifications per user.

- **Payment & Commission Model:** Transactions recorded per completed booking (service amount, 10% platform commission default, net payout); configurable commission rates (8% for contractors); electrician earnings history; admin revenue/commission breakdown; payment summary shown to customer before booking confirmation.

- **Design System:** Dark charcoal background (#1A1A2E), electric yellow accent (#F5C518), white text, Inter font, flat high-contrast UI, left sidebar navigation on all dashboards, lightning bolt brand motif, mobile-first responsive layout.

**User-visible outcome:** Users can register and log in by role, discover and book verified electricians by location and category, browse and cart electrical products, apply for government contracts, manage earnings and verifications through role-specific dashboards, and receive in-app notifications — all within a consistent dark industrial UI.
