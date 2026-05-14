# Zoro E-Commerce Platform

Professional documentation for the Zoro full-stack e-commerce system.

## Overview

Zoro is a three-application commerce platform:

- `frontend`: customer-facing storefront
- `admin`: operational dashboard for catalog and order management
- `backend`: API server, authentication, and data layer

The system supports product browsing, cart management, order placement, user authentication, and admin order processing.

## Core Features

Customer application (`frontend`):

- Product catalog and item detail browsing
- Cart add/update/remove operations
- Order placement with address details
- User authentication (register/login)
- Order history view

Admin application (`admin`):

- Admin authentication
- Product create/list/remove
- Order list and status updates

Backend application (`backend`):

- REST APIs for user, product, cart, and orders
- JWT-based authentication middleware
- MongoDB persistence using Mongoose
- Cloudinary media integration
- Stripe and Razorpay payment integration scaffolding (not allowed in my country)

## Technology Stack

- Runtime: Node.js
- Backend: Express, Mongoose, JWT, bcrypt
- Frontend/Admin: React + Vite
- Styling: Tailwind CSS
- HTTP Client: Axios
- Database: MongoDB
- Media: Cloudinary

## Repository Structure

```text
ECOMMERCE-APP/
  backend/     API server and business logic
  frontend/    Customer web app
  admin/       Admin web app
  Read.md      Project documentation
```

## Prerequisites

Install the following before setup:

- Node.js (LTS recommended)
- npm
- MongoDB Atlas (or local MongoDB)
- Cloudinary account

Verify local tooling:

```bash
node -v
npm -v
```

## Environment Configuration

Create the following environment files.

### `backend/.env`

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_strong_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=4000
```

### `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

### `admin/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Installation

Run from the repository root:

```bash
npm --prefix backend install
npm --prefix frontend install
npm --prefix admin install
```

## Local Development

Use three terminals.

Terminal 1 (backend):

```bash
npm --prefix backend run server
```

Terminal 2 (frontend):

```bash
npm --prefix frontend run dev
```

Terminal 3 (admin):

```bash
npm --prefix admin run dev
```

Typical local endpoints:

- Backend: `http://localhost:4000`
- Frontend: Vite output URL (usually `http://localhost:5173`)
- Admin: Vite output URL (usually `http://localhost:5174`)

## Production Build and Runtime

Build web applications:

```bash
npm --prefix frontend run build
npm --prefix admin run build
```

Run backend service:

```bash
npm --prefix backend run start
```

Output notes:

- `frontend/dist` and `admin/dist` are deployable static assets.
- Backend should be deployed as a persistent Node service.

## API Reference (High-Level)

Authentication/User:

- `POST /api/user/register`
- `POST /api/user/login`
- `POST /api/user/admin`

Product:

- `GET /api/product/list`
- `POST /api/product/add`
- `POST /api/product/remove`

Cart:

- `POST /api/cart/add`
- `PUT /api/cart/update`
- `GET /api/cart/get`

Order:

- `POST /api/order/place`
- `POST /api/order/stripe`
- `POST /api/order/razorpay`
- `POST /api/order/userorders`
- `POST /api/order/list`
- `POST /api/order/status`

## Authentication Behavior

- Customer token storage key: `token`
- Admin token storage key: `admin_token`

This separation prevents session collisions between customer and admin flows.

## Troubleshooting Guide

Issue: `Request failed with status code 404` during cart quantity update

- Cause: route method mismatch
- Resolution: ensure client calls `PUT /api/cart/update`

Issue: API still points to localhost after deployment

- Cause: Vite env files still use local URL
- Resolution: update `VITE_BACKEND_URL` in both frontend and admin environment settings

Issue: admin login rejected

- Cause: invalid admin env credentials
- Resolution: verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` on backend and restart server

Issue: image upload failures

- Cause: Cloudinary variables missing or invalid
- Resolution: verify key, secret, and cloud name

## Security Requirements

- Do not commit `.env` files
- Rotate any previously exposed secrets
- Use a strong `JWT_SECRET`
- Enforce HTTPS in production
- Keep admin credentials private and server-side only

## Deployment Readiness Checklist

- Configure production environment variables on hosting platform
- Confirm frontend and admin builds pass
- Confirm backend starts and connects to MongoDB
- Update frontend/admin backend URL to production API
- Validate critical flows:
  - register/login
  - cart add/update/remove
  - place order
  - admin login
  - order status update

## Quick Start

```bash
npm --prefix backend install
npm --prefix frontend install
npm --prefix admin install

npm --prefix backend run server
```

Open two additional terminals:

```bash
npm --prefix frontend run dev
npm --prefix admin run dev
```

If startup fails, check environment variables first, then review terminal output from top to bottom.
