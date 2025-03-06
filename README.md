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
  - Request Body: 
    ```json
    {
      "userName": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "message": "User registered successfully",
      "token": "jwt_token",
      "data": {
        "userName": "string",
        "email": "string",
        "id": "string"
      }
    }
    ```

- `POST /api/v1/user/login`
  - Login user
  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "token": "jwt_token",
      "data": {
        "userName": "string",
        "email": "string"
      }
    }
    ```

#### Admin Routes
- `POST /api/v1/admin/login`
  - Login admin
  - Request Body:
    ```json
    {
      "email": "admin@Vetlypets.com",
      "password": "Admin1234"
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "token": "jwt_token",
      "data": {
        "userName": "admin",
        "email": "admin@Vetlypets.com"
      }
    }
    ```

### Pet Management Endpoints

#### Admin Only Routes
- `POST /api/v1/pet/addpet`
  - Add new pet
  - Headers: `Authorization: Bearer jwt_token`
  - Request Body (form-data):
    ```json
    {
      "breedName": "string",
      "age": "number",
      "cost": "number",
      "quantity": "number",
      "picture": "file"
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "message": "Pet added successfully",
      "data": {
        "id": "string",
        "breedName": "string",
        "age": "number",
        "cost": "number",
        "quantity": "number",
        "pictureUrl": "string"
      }
    }
    ```

- `PUT /api/v1/pet/editPet/:id`
  - Edit existing pet
  - Headers: `Authorization: Bearer jwt_token`
  - Request Body:
    ```json
    {
      "breedName": "string",
      "age": "number",
      "cost": "number",
      "quantity": "number"
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "message": "Pet updated successfully",
      "data": {
        "id": "string",
        "breedName": "string",
        "age": "number",
        "cost": "number",
        "quantity": "number"
      }
    }
    ```

#### User Routes
- `PUT /api/v1/pet/buy/:id`
  - Purchase pet
  - Headers: `Authorization: Bearer jwt_token`
  - Request Body:
    ```json
    {
      "quantity": "number"
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "message": "Purchase successful",
      "data": {
        "petId": "string",
        "quantity": "number",
        "totalCost": "number"
      }
    }
    ```



I've added detailed request and response examples for each endpoint, including:
- Required headers
- Request body format
- Response format with example data
- HTTP status codes and error responses

The rest of the README remains unchanged.

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

## Postman Documentation URL
https://documenter.getpostman.com/view/41141997/2sAYdmm8Sn


   ## Medium URL
   https://medium.com/@jinyjagz/understanding-jwt-authentication-in-node-js-and-express-c8ce76fe3747
