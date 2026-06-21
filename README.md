# Aplod Ecommerce

Full-stack ecommerce app with React frontend, Express backend, and MongoDB data storage.

## Backend setup

Create `backend/.env`:

```env
MONGOURL=mongodb://127.0.0.1:27017/aplod
PORT=6001
```

Run:

```bash
cd backend
npm install
npm run seed
npm run dev
```

The seed command creates ecommerce categories and products in MongoDB.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, usually `http://localhost:5173`.

## Features

- Product categories, media, stock, MRP, ratings, tags, and featured products
- Customer store with search, category tabs, cart drawer, and checkout form
- Database-backed orders with customer, shipping, payment, totals, and stock reduction
- Admin pages for categories, products, and order status management
