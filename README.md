# 🐶 Veterinary Store API

A **RESTful API** for managing a digital **pet marketplace**, where users can browse available pets, place orders, and admins can manage inventory. Built with **Node.js, Express, MongoDB, and JWT Authentication**.

---

## 📚 Features

### 🏠 **Pet Management**
- **View Available Pets** 📷🐕  
- **Admin Only**: Add, Edit, and Remove Pets 🛠️  

### 🛍️ **Ordering System**
- **Users can order pets**  
- **Stock automatically updates when a pet is purchased**  

### 🔐 **Authentication & Security**
- **JWT-based authentication** for secure access  
- **Role-Based Access Control (Admin vs. User)**  

### 🚀 **Additional Features**
- **Cloudinary Integration** for image uploads  
- **MongoDB with Mongoose** for database management  
- **CORS & Secure Headers** for API protection  

---

## 🛠️ **Tech Stack**
| Technology  | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web framework for APIs |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ORM for schema validation |
| **JWT** | JSON Web Tokens for authentication |
| **bcrypt.js** | Secure password hashing |
| **Cloudinary** | Image storage & management |

---

## 🚀 **Getting Started**

### **📌 Prerequisites**
- **Node.js** (v14+ recommended)  
- **MongoDB** (local or Atlas)  
- **Postman** (for testing API requests)  

---

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/vetstore-api.git
cd vetstore-api


2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4️⃣ Start the Server
sh
Copy
Edit
npm start
or with Nodemon for hot reload:

sh
Copy
Edit
npm run dev
✅ The API will run at:
http://localhost:6060

📜 API Documentation
🔐 Authentication Endpoints
Method	Endpoint	Description	Access
POST	/api/v1/auth/signup	Register a new user	Public
POST	/api/v1/auth/login	User login & get JWT token	Public


🐕 Pet Management Endpoints
Method	Endpoint	Description	Access
GET	/api/v1/pets	Get all pets	Public
POST	/api/v1/pets	Add new pet	Admin Only
PUT	/api/v1/pets/:id	Update pet details	Admin Only
DELETE	/api/v1/pets/:id	Remove pet	Admin Only
🛍️ Pet Orders Endpoints
Method	Endpoint	Description	Access
POST	/api/v1/orders	Order a pet	User Only
GET	/api/v1/orders	View user orders	User Only


📦 Sample Request/Response
1️⃣ Registering a New User
Request:
http
Copy
Edit
POST /api/v1/auth/signup
Content-Type: application/json
json
Copy
Edit
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
Response:
json
Copy
Edit
{
  "message": "User registered successfully",
  "user": {
    "id": "65fba12345678abc",
    "email": "john@example.com",
    "role": "user"
  }
}
2️⃣ Adding a New Pet (Admin Only)
Request:
http
Copy
Edit
POST /api/v1/pets
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
json
Copy
Edit
{
  "breedName": "Golden Retriever",
  "age": 2,
  "cost": 500,
  "picture": "https://example.com/golden-retriever.jpg"
}
Response:
json
Copy
Edit
{
  "message": "Pet added successfully!",
  "pet": {
    "breedName": "Golden Retriever",
    "cost": 500
  }
}
🔒 Error Handling
This API implements a global error handler to return consistent and descriptive error messages.

Status Code	Meaning	Example Error Response
400	Bad Request	{ "message": "Invalid input data" }
401	Unauthorized	{ "message": "Invalid token" }
404	Not Found	{ "message": "Pet not found" }
500	Server Error	{ "message": "Something went wrong" }
📅 Project Structure
pgsql
Copy
Edit
src/
├── app.js                 # Express application setup
├── server.js              # Server entry point
├── config/                # Configuration files
│   └── database.js        # Database connection
├── controllers/           # Request handlers
│   ├── authController.js
│   ├── petController.js
│   ├── orderController.js
├── middleware/            # Custom middleware
│   ├── auth.js            # JWT Authentication middleware
│   ├── errorHandler.js    # Global error handler
├── models/                # Mongoose models
│   ├── User.js
│   ├── Pet.js
│   ├── Order.js
├── routes/                # API routes
│   ├── authRoutes.js
│   ├── petRoutes.js
│   ├── orderRoutes.js
├── services/              # Business logic
│   ├── authService.js
│   ├── petService.js
│   ├── orderService.js
└── utils/                 # Utility functions
    ├── ApiError.js        # Custom error class
    ├── asyncHandler.js    # Async error wrapper


🛠️ Deployment
This API can be deployed on Render, Railway, or Vercel.

1️⃣ Deploy on Render
Push your project to GitHub
Go to Render
Select "New Web Service" → Connect GitHub Repo
Set Start Command:
sh
Copy
Edit
node server.js
Deploy & Get Public URL!
📜 License
This project is MIT Licensed. Feel free to use and modify.

