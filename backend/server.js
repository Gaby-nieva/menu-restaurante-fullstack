import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

//  RUTA DE PRUEBA

app.get("/", (req, res)=> {
    res.send("API funcionando");
});

//  CONEXION A MONGODB

mongoose.connect (process.env.MONGO_URI)
    .then(()=> console.log("MongoSB conectado"))
    .catch((err)=> console.log(err));

//  LEVANTAR SERVIDOR

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});