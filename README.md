# TradeConnect – Job Management Platform (MERN Stack)

## 📌 Overview

TradeConnect is a full-stack MERN application where users can:

- Register and login
- Post trade job requests
- View all jobs publicly
- Update job status
- Delete only the jobs you posted


---

## 🚀 Features

### 🔐 Authentication
- JWT login system
- Register / Login users
- Protected routes
- Persistent login using localStorage

### 🧰 Job System
- Create jobs
- View jobs (public)
- Update job status (Open / In Progress / Closed)
- Delete only own jobs

### 🎨 UI Features
- React + Tailwind UI
- Responsive design
- Clean modern cards
- Rounded inputs & buttons

---

## 🧱 Tech Stack

### Frontend
- React
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

---

## 📁 Project Structure (Clean View)

### Backend

Backend
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   └── jobController.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   ├── User.js
│   └── JobRequest.js
│
├── routes
│   ├── authRoutes.js
│   └── jobRoutes.js
│
├── server.js
└── .env


### Frontend

frontend
├── src
│ ├── api
│ ├── components
│ ├── pages
│ ├── App.jsx
│ └── main.jsx
├── index.html
└── package.json


---

## ⚙️ Installation

### 1️⃣ Clone Project
```bash
git clone <repo-url>
cd TradeConnect
🖥️ Backend Setup
cd backend
npm install
Create .env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

👉 To get MongoDB URI:

Go to MongoDB Atlas
Create cluster
Copy connection string
Run Backend
npm run dev

Backend runs at:

http://localhost:5000
🌐 Frontend Setup
cd frontend
npm install
npm install axios react-router-dom
Run Frontend
npm run dev

Frontend runs at:

http://localhost:5173
🔌 API ENDPOINTS
Auth Routes
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
Job Routes
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE /api/jobs/:id
🔐 Rules
Anyone can view jobs
Only logged-in users can create jobs
Only owner can delete jobs
Only authenticated users can update jobs
📦 Job Schema
{
  title,
  description,
  category,
  location,
  contactName,
  contactEmail,
  status: "Open | In Progress | Closed",
  createdBy,
  createdAt
}
⚠️ Common Issues
CORS Error
app.use(cors({
  origin: "http://localhost:5173"
}));
MongoDB Error
Check .env
Check URI format
JWT Error

Make sure:

JWT_SECRET exists
🔮 Future Improvements
Role-based authentication
Search & filters
Pagination
Admin dashboard
Deployment (Vercel + Railway)
👨‍💻 Author

Built using MERN stack for learning full-stack development.
