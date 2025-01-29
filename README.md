# Auth & File Upload API

This project provides user authentication and image upload functionality using Node.js, Express, MongoDB, and Cloudinary.

## Features

- User Registration & Login
- JWT-based Authentication
- Role-based Access Control (Admin & User)
- Image Upload to Cloudinary
- Image Retrieval & Deletion
- Password Change

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for Image Storage)
- Multer (for File Uploads)
- Bcrypt (for Password Hashing)
- JWT (for Authentication)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/BaskaranV15/auth-fileuplode.git
   ```
2. Navigate to the project directory:
   ```sh
   cd auth-fileuplode
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

## Usage

### Start the Server

```sh
npm start
```

### API Endpoints

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/change-password` - Change user password

#### Image Upload

- `POST /api/image/upload` - Upload an image (Admin only)
- `GET /api/image/:id` - Fetch image details
- `DELETE /api/image/:id` - Delete an image (Only the uploader can delete)

#### Protected Routes

- `GET /api/admin` - Admin-only access
- `GET /api/home` - Home route for authenticated users

## Middleware

- `authMiddleware.js` - Validates JWT token
- `adminMiddleware.js` - Restricts access to admins
- `uploadMiddleware.js` - Handles file uploads with Multer

## Postman API Testing

### 1. Register User

- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/register`
- **Body (JSON):**
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### 2. Login User

- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Body (JSON):**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```

### 3. Upload Image (Admin Only)

- **Method:** POST
- **URL:** `http://localhost:5000/api/image/upload`
- **Headers:**
  - Authorization: `Bearer <your_token>`
- **Body (Form-Data):**
  - Key: `image`
  - Value: (Select an image file)

### 4. Delete Image (Uploader Only)

- **Method:** DELETE
- **URL:** `http://localhost:5000/api/image/:id`
- **Headers:**
  - Authorization: `Bearer <your_token>`

## Contributions

Feel free to fork the repository and submit pull requests!

## License

This project is licensed under the MIT License.

