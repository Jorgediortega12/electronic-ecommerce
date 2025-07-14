import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/route-auth";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("API funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`Backend corriendo exitosamente desde el puerto ${PORT}`);
});
