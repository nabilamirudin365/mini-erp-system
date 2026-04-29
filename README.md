# 🧾 Mini ERP System (Inventory & Sales)

A fullstack web application for managing products, transactions, and sales flow. Built using modern JavaScript stack with a focus on real-world **Enterprise-grade** business logic, security, and user experience.

---

## 🚀 Features

* 🔐 **Robust Authentication**: JWT locked inside HttpOnly Cookies to prevent XSS.
* 👥 **Role-Based Access Control (RBAC)**: Distinct permissions for `admin` and `user/kasir`.
* 📦 **Product Management**: Complete CRUD with automatic stock tracking.
* 🛒 **Transaction System**: Point of Sales (POS) with atomic database transactions (`$transaction`) to ensure data consistency.
* 🛡️ **Enterprise Security**:
  * **Input Validation**: Zod middleware for strict data sanitation.
  * **Rate Limiting**: Brute-force protection on authentication routes.
  * **Soft Delete**: Non-destructive data deletion (maintains historical transaction integrity).
* ⚡ **Performance Optimization**: Pagination implemented on product lists to prevent memory leaks.
* 📊 **Centralized Error Handling**: Standardized API responses across all endpoints.
* 🎨 **Neo Brutalism UI**: A bold, modern, and high-contrast user interface.

---

## 🧠 Tech Stack

### Frontend
* React + Vite
* Tailwind CSS (Neo Brutalism design system)
* Axios (with global interceptors)

### Backend
* Node.js + Express
* **Prisma ORM** (Database interaction & schema management)
* Zod (Schema validation)
* express-rate-limit
* Morgan (HTTP Request Logger)
* bcrypt & jsonwebtoken

### Database
* PostgreSQL

---

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/nabilamirudin365/mini-erp-system.git
cd mini-erp-system
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/belajar_react?schema=public"
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

Push database schema (creates tables based on Prisma schema):
```bash
npx prisma db push
```

Run server:
```bash
npm run dev
```

---

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints (Snapshot)

All responses are wrapped in a standard format: `{ status, message, data }`.

* **Auth**: `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`
* **Users**: `GET /users`, `GET /users/:id`, `PUT /users/:id`, `DELETE /users/:id`
* **Products**: `GET /products?page=1&limit=10`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id` (Soft Delete)
* **Transactions**: `POST /transactions`, `GET /transactions/history`
* **Dashboard/Reports**: `GET /dashboard/summary`, `GET /reports/sales-trend`

---

## 📌 Future Improvements

* Automated Unit & Integration Testing (Jest/Supertest)
* Export Reports to PDF / Excel
* Audit Logs (Tracking who changed product prices or deleted users)
* Dockerization for easier deployment

---

## 👨‍💻 Author

Nabil Amirudin
