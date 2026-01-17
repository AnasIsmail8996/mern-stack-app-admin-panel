import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnect } from "./db/config.js";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/authRoutes.js";
import adminProductsRouter from "./routes/admin/productsRoutes.js"
import shopProductsRouter from "./routes/shop/ProductsRoutes.js"
import shopCartRouter from "./routes/shop/cartRoutes.js"
import shopAddressRouter from "./routes/shop/addressRoutes.js"
import shopOrderRouter from "./routes/shop/orderRoutes.js"
import adminOrdersRouter from "./routes/admin/orderRoutes.js"
import shopSearchRouter from "./routes/shop/searchRoute.js"
import shopProductsReviewRouter from "./routes/shop/ProductsReviewRoute.js"
import commonFeaturesRouter from "./routes/common/featuresRoutes.js"

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://13.60.44.111:5173"],
  methods:['GET', 'POST', 'PUT', 'PITCH', 'DELETE'],
  credentials: true,
  allowedHeaders:[
    "Content-Type",
    'Authorization',
    'Cache-Control',
    'Expires',
    'Pragma'
  ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dbConnect();




app.use('/api/auth', authRoutes)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/admin/orders', adminOrdersRouter)

app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/shop/search', shopSearchRouter)
app.use('/api/shop/review', shopProductsReviewRouter);
app.use('/api/common/feature', commonFeaturesRouter);



app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
