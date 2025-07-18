import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth/route-auth";
import getProfileRoute from "./routes/profile/route-profile";
import productRoutes from "./routes/product/product-route";
import cartRoutes from "./routes/cart/cart-route";
import categoriesRoutes from "./routes/category/category-route";
import orderRoutes from "./routes/order/order-route";
import paymentRoutes from "./routes/payment/payment-routes";
import notificationRoutes from "./routes/notification/notification-routes";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", getProfileRoute);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/category", categoriesRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (_req, res) => {
  res.send("API funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`Backend corriendo exitosamente desde el puerto ${PORT}`);
});
