# Pizza Delivery Backend

A Node.js backend for a pizza delivery system with user authentication, pizza building, order management, and admin features.

## Features

- User registration and email verification
- JWT authentication
- Pizza builder with inventory management
- Order placement with Razorpay integration
- Real-time order status updates
- Admin dashboard for inventory and order management
- Low stock alerts via email

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your credentials
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Pizza

- `GET /api/pizza/ingredients` - Get available ingredients
- `GET /api/pizza/bases` - Get pizza bases
- `GET /api/pizza/sauces` - Get sauces
- `GET /api/pizza/cheeses` - Get cheeses

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status

### Admin

- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/inventory` - Get inventory
- `PUT /api/admin/inventory/:id` - Update inventory item
- `POST /api/admin/inventory` - Add inventory item
- `GET /api/admin/inventory/low-stock` - Get low stock alerts

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Razorpay for payments
- Nodemailer for emails
- Node-cron for scheduled tasks
