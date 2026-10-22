# 🚀 Unity Print Pack Solutions - Backend API (Node.js + Express + MongoDB)

Production-ready REST API built with Node.js, Express.js, and MongoDB (Mongoose) for Unity Print Pack Solutions.

---

## 📁 Directory Structure
```
backend/
├── config/
│   └── db.js                 # MongoDB connection logic with timeout and error handling
├── controllers/
│   ├── authController.js     # Admin login & JWT verification
│   ├── productController.js  # CRUD for Packaging Products
│   ├── galleryController.js  # CRUD for Gallery showcase
│   ├── clientController.js   # CRUD for Client partners & case studies
│   └── enquiryController.js  # Customer packaging quote & order enquiries
├── middleware/
│   ├── authMiddleware.js     # JWT Bearer token protection
│   └── uploadMiddleware.js   # Multer file storage for images
├── models/
│   ├── Admin.js              # Admin credentials with bcrypt hashing
│   ├── Product.js            # Packaging product schema
│   ├── Gallery.js            # Gallery photo schema
│   ├── Client.js             # Brand client partner schema
│   └── Enquiry.js            # Customer orders & quotes schema
├── routes/
│   ├── authRoutes.js         # /api/auth
│   ├── productRoutes.js      # /api/products
│   ├── galleryRoutes.js      # /api/gallery
│   ├── clientRoutes.js       # /api/clients
│   ├── enquiryRoutes.js      # /api/enquiries
│   └── uploadRoutes.js       # /api/upload
├── seed/
│   └── seedData.js           # Initial data populate script
├── uploads/                  # Uploaded image files directory
├── .env                      # Environment variables
├── .env.example              # Environment template
├── package.json
└── server.js                 # Express application entry point
```

---

## ⚙️ Environment Setup (`backend/.env`)

Configure the following variables in `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/unity_print
JWT_SECRET=unity_print_pack_jwt_secret_super_key_2026
CLIENT_URL=http://localhost:5173
DEFAULT_ADMIN_EMAIL=admin@unityprint.com
DEFAULT_ADMIN_PASSWORD=admin123
```

> **Using MongoDB Atlas (Cloud):**  
> Replace `MONGO_URI` with your Atlas connection string:  
> `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/unity_print?retryWrites=true&w=majority`

---

## 🏃‍♂️ How to Run

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Seed Initial Database with Products, Gallery & Clients:**
   ```bash
   npm run seed
   ```

3. **Start Development Server (with nodemon):**
   ```bash
   npm run dev
   ```
   Or normal start:
   ```bash
   npm start
   ```

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/health` | Check API & MongoDB connection status | Public |
| `POST` | `/api/auth/login` | Admin login & get JWT token | Public |
| `GET` | `/api/auth/me` | Get current logged in Admin | Protected |
| `GET` | `/api/products` | Get products (filter: `?category=rigid&search=box`) | Public |
| `POST` | `/api/products` | Create new product | Protected |
| `PUT` | `/api/products/:id` | Update product | Protected |
| `DELETE` | `/api/products/:id` | Delete product | Protected |
| `GET` | `/api/gallery` | Get gallery showcase photos | Public |
| `POST` | `/api/gallery` | Add photo to gallery | Protected |
| `DELETE` | `/api/gallery/:id` | Delete photo from gallery | Protected |
| `GET` | `/api/clients` | Get client brand partners | Public |
| `POST` | `/api/clients` | Add client partner | Protected |
| `PUT` | `/api/clients/:id` | Update client partner | Protected |
| `DELETE` | `/api/clients/:id` | Delete client partner | Protected |
| `POST` | `/api/enquiries` | Submit custom packaging order / quote | Public |
| `GET` | `/api/enquiries` | Get customer orders / enquiries list | Protected |
| `PUT` | `/api/enquiries/:id` | Update enquiry status (`new`, `contacted`, etc.) | Protected |
| `POST` | `/api/upload` | Upload image file (Multer) | Protected |
