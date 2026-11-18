# Iringa Soko Mkononi — technical notes

## Current delivery
This ZIP remains the existing static HTML/CSS/JavaScript application, enhanced in place. It is not a deployed backend. Product listings, favourites, shipment records and support-chat history are stored in the browser's `localStorage`; uploaded product images are stored as data URLs. Data is local to the browser/device and is not shared between customers.

## Recommended microservices target (not yet deployed)
Avoid turning the current static app into a large monolith. When a backend is introduced, split responsibilities behind an API gateway:
- **Identity service:** registration, login, sessions and roles.
- **Catalog service:** categories, product listings, image metadata and search.
- **Media service:** image upload, validation, resizing and object storage.
- **Orders service:** order lifecycle and order references.
- **Delivery service:** delivery address, courier selection, tracking number and shipment events.
- **Messaging service:** buyer/seller conversations and message delivery.
- **Support service:** chatbot handoff, customer-support tickets and audit logs.
- **Notification service:** SMS, email or push notifications.
- **Payment integration:** payment-provider callbacks and reconciliation; never store card secrets in the browser.

Use a relational database per service (or service-owned schemas initially), object storage for images, a message broker for asynchronous events, centralized logs/metrics, rate limiting, input validation, authentication and role-based authorization. Define versioned REST APIs or events between services.

## Integration gaps
Real authentication, cross-device persistence, real-time buyer/seller messaging, courier API tracking, customer-support agent dashboards and AI chatbot responses require server-side services and credentials. The present front end deliberately labels its local demo behavior rather than pretending these integrations are live.

## Supabase database package (prepared, not provisioned)
A PostgreSQL schema and setup guide are included in `database/supabase-schema.sql` and `DATABASE-HOSTING-GUIDE-SW.md`. The schema covers user profiles, categories, products, favorites, buyer needs, orders, shipments/tracking, conversations/messages, support tickets/logs, promotions, and product-image storage with Row Level Security policies. It is not a live cloud database until the owner creates a Supabase project and runs the SQL. `js/supabase-client.js` is an optional client bootstrap; the existing forms still require feature-by-feature Supabase CRUD/Auth/Storage integration and testing before they become shared online features.
