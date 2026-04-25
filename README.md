# 🧾 Mini ERP System (Inventory & Sales)

A fullstack web application for managing products, transactions, and sales flow. Built using modern JavaScript stack with a focus on real-world business logic and user experience.

---

## 🚀 Features

* 🔐 Authentication (Register & Login with JWT)
* 📦 Product Management
* 🛒 Transaction System (Cart + Checkout)
* 📉 Stock Management (auto update)
* 💰 Real-time total calculation
* 🎨 Neo Brutalism UI

---

## 🧠 Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Axios

### Backend

* Node.js + Express

### Database

* PostgreSQL

### Others

* JWT Authentication
* bcrypt (password hashing)

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/username/mini-erp.git
cd mini-erp
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=belajar_react
JWT_SECRET=your_secret
```

Run server:

```bash
node server.js
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

* POST `/register`
* POST `/login`
* GET `/products`
* POST `/transactions`

---

## 📸 Preview

(coming soon)

---

## 📌 Future Improvements

* Sales report & analytics
* Role-based access (admin/kasir)
* Deployment (Vercel + Railway)
* Pagination & filtering

---

## 👨‍💻 Author

Nabil Amirudin
