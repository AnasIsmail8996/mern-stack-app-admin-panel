🛒 MERN E-Commerce App

A full-stack e-commerce application built using the MERN stack with an integrated Admin Panel.
Admins can manage products, and customers can browse items, add them to the cart, and complete purchases.

🚀 Features
Customer Features

Browse all products

Product detail view

Add to cart / remove from cart

Checkout & order placement

User login & registration

Responsive UI

Admin Features

Admin login

Add new products

Edit product details

Delete products

Manage categories

View customer orders

Update order status

🧰 Tech Stack

Frontend: React, Redux Toolkit, React Router, Axios, Tailwind CSS
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT Auth, Multer
Other: Cloudinary / Stripe / PayPal (optional)

📁 Folder Structure
client/        # React frontend
server/        # Node.js backend API
.env           # Environment variables (ignored)
README.md

⚙️ Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_KEY=optional
STRIPE_SECRET=optional

Frontend (.env)
VITE_API_URL=http://localhost:5000

▶️ Run the Project
Install dependencies
cd server
npm install

cd ../client
npm install

Start backend
cd server
npm run dev

Start frontend
cd client
npm run dev

🧪 API Endpoints Overview
Auth

POST /api/auth/register

POST /api/auth/login

Products

GET /api/products

POST /api/products (admin)

PUT /api/products/:id (admin)

DELETE /api/products/:id (admin)

Orders

POST /api/orders

GET /api/orders (admin)

GET /api/orders/user/:id

📄 License

This project is licensed under the MIT License.

If you want, I can also generate a short version, professional GitHub-style, or with badges & screenshots.
