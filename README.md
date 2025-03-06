# Challenge2Vet

Challenge2Vet is a RESTful API for managing a veterinary store that enables pet management with admin and user roles.

## Features

- User authentication (sign up, log in)
- Admin authentication and authorization
- Pet management (add, edit, purchase)
- Image upload and storage using Cloudinary
- Security features:
  - Rate limiting
  - XSS protection
  - MongoDB sanitization
  - JWT authentication
  - Password hashing

## Technologies Used

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Multer for file uploads
- Cloudinary for image storage
- Pino for logging
- bcryptjs for password hashing
- Morgan for HTTP request logging
- Express-rate-limit for API rate limiting
- XSS-clean & Express-mongo-sanitize for security

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/challenge2vet.git
cd challenge2vet
```

2. Install dependencies:
```sh
npm install
```

3. Configure environment variables - create a .env file:
```env
PORT=6060
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_EXPIRES_IN=1h
```

### Running the Application

Development mode:
```sh
npm run dev
```

Production mode:
```sh
npm start
```

## API Documentation

### Authentication Endpoints

#### User Routes
- `POST /api/v1/user/signup`
  - Register new user
  - Body: `{userName, email, password}`

- `POST /api/v1/user/login`
  - Login user
  - Body: `{userName/email, password}`

#### Admin Routes
- `POST /api/v1/admin/login`
  - Login admin
  - Body: `{userName/email, password}`
  - Default admin credentials:
    - Email: admin@Vetlypets.com
    - Password: Admin1234

### Pet Management Endpoints

#### Admin Only Routes
- `POST /api/v1/pet/addpet`
  - Add new pet
  - Requires admin authentication
  - Form-data: `{breedName, age, cost, quantity, picture}`

- `PUT /api/v1/pet/editPet/:id`
  - Edit existing pet
  - Requires admin authentication
  - Body: `{breedName, age, cost, quantity}`

#### User Routes
- `PUT /api/v1/pet/buy/:id`
  - Purchase pet
  - Body: `{quantity}`

## Security Features

1. Rate Limiting
   - 5 requests per 10 seconds per IP

2. Data Sanitization
   - MongoDB query injection protection
   - XSS protection

3. Authentication
   - JWT-based authentication
   - Password hashing using bcrypt

## File Structure

```
├── app.js
├── src/
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── pet.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── admin.model.js
│   │   ├── pet.models.js
│   │   └── user.models.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── pet.routes.js
│   │   └── user.routes.js
│   └── utils/
│       └── log/
│           ├── logger.js
│           └── image/
│               ├── cloudinary.js
│               └── multer.js
├── uploads/
└── .env
```

## Error Handling

The API implements comprehensive error handling for:
- Invalid requests
- Authentication failures
- Database errors
- File upload issues


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
