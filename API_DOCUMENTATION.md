# 🌸 Bella Store Backend — API Documentation

Complete REST API documentation for the **Bella Store E-Commerce Backend**, built with Node.js, Express.js, MySQL, JWT authentication, and Bcrypt password hashing.

---

## 🛠️ Technology Stack & Dependencies

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MySQL 8.0+ / MariaDB
- **Authentication**: JSON Web Tokens (`jsonwebtoken`)
- **Password Hashing**: `bcryptjs`
- **File Uploads**: `multer`
- **Validation**: `express-validator`

---

## 🔑 Authentication

Authentication uses HTTP Bearer Tokens in the `Authorization` header:

```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## 📍 API Endpoints Summary

### 1. Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new customer account |
| `POST` | `/api/auth/login` | Public | Customer login (returns JWT token) |
| `POST` | `/api/auth/admin-login` | Public | Admin login (`password: bella123` or `admin`) |
| `GET` | `/api/auth/me` | Protected | Fetch current logged-in user profile |
| `PUT` | `/api/auth/profile` | Protected | Update profile (name, phone, address) |

---

### 2. Products (`/api/products`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/products` | Public | Fetch all products (supports `category`, `search`, `minPrice`, `maxPrice`, `sort`, `page`) |
| `GET` | `/api/products/:id` | Public | Get single product by ID with customer reviews |
| `POST` | `/api/products` | Admin | Create a new product |
| `PUT` | `/api/products/:id` | Admin | Update product details / stock / price |
| `DELETE` | `/api/products/:id` | Admin | Delete a product |
| `POST` | `/api/products/:id/reviews` | Public | Add a review for a product |

---

### 3. Categories (`/api/categories`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/categories` | Public | List all categories with product counts |
| `POST` | `/api/categories` | Admin | Create a new product category |
| `DELETE` | `/api/categories/:id` | Admin | Delete a category |

---

### 4. Orders (`/api/orders`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/orders` | Admin | Fetch all customer orders |
| `GET` | `/api/orders/:orderCode` | Public | Get specific order by `ORD-XXXXX` code |
| `POST` | `/api/orders` | Public | Place a new order |
| `PUT` | `/api/orders/:orderCode/status` | Admin | Update order status (`Processing`, `Shipped`, `Delivered`, `Cancelled`) |

---

### 5. Contact Concierge (`/api/contact`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/contact` | Public | Send customer message to support |
| `GET` | `/api/contact` | Admin | View all submitted messages |
| `PUT` | `/api/contact/:id/read` | Admin | Mark message as read |

---

### 6. Coupons (`/api/coupons`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/coupons/validate` | Public | Validate promo code (`BELLA10`, `LUXURY20`, `WELCOME15`) |
| `GET` | `/api/coupons` | Admin | View all active coupons |
| `POST` | `/api/coupons` | Admin | Create a new coupon code |

---

### 7. File Upload (`/api/upload`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/upload` | Public/Admin | Upload single image (`multipart/form-data`, field: `image`) |
| `POST` | `/api/upload/multiple` | Public/Admin | Upload up to 5 images (field: `images`) |
