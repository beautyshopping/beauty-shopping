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
This project includes `render.yaml` for a Node web service. Connect the GitHub repository to Render, create the service from the repo, and set `ADMIN_PASSWORD` as a secret environment variable.

### Important data note
The current starter stores products, orders, users and settings in JSON files and uploaded images in `uploads/`. On hosts with ephemeral filesystems, these files are not a durable production database. For a real launch, move these records to a managed database and image storage, or use persistent storage provided by the host.
