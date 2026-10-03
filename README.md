# Beauty Shopping — Marketplace

Beauty Shopping is a Bangla/Banglish multi-category marketplace with guest checkout, optional customer accounts, product management, and an admin order panel.

## Customer experience
- Customer Login / Create Customer Account only
- Guest shopping and guest checkout are supported
- No Merchant Login is shown to customers
- WhatsApp Customer Care: 01750475598
- Nationwide delivery: ৳110 flat
- Cash on Delivery
- District → Upazila dependent checkout fields
- Product cards support image, name, current price, old price/discount, stock and badges

## Admin
Open `/admin` to manage products, settings and orders.
Products can be added with image, name, category, price, discount price and stock; uploaded products are served automatically from the catalog.

Set a strong `ADMIN_PASSWORD` environment variable before production use.

## Local run
1. `npm install`
2. Set `ADMIN_PASSWORD` in your environment.
3. `npm start`
4. Storefront: `http://localhost:3000`
5. Admin: `http://localhost:3000/admin`
6. Health check: `http://localhost:3000/api/health`

## Render deployment
The project now uses PostgreSQL for the product catalog when `DATABASE_URL` is configured. The included `render.yaml` defines a Render Postgres database and automatically wires its connection string into the web service. Render Blueprints support this `fromDatabase` connection pattern.

### Product persistence
- Products, prices, discount prices, stock, featured status and product images are stored in PostgreSQL when deployed with `DATABASE_URL`.
- Product images are stored as data URLs in the database, so they do not depend on Render's ephemeral local filesystem.
- The server creates the `products` table automatically on startup.
- If an old `data/products.json` exists and the database is empty, the server performs a one-time catalog migration.
- For local development without `DATABASE_URL`, the existing JSON fallback remains available.

### Existing Render service
If this repository is already connected to an existing Render web service, create/connect a Render Postgres database and make sure the web service has a `DATABASE_URL` environment variable containing the database connection string before deploying the new code. If you use the Blueprint, sync the `render.yaml` so Render creates the database and wires `DATABASE_URL` automatically.
