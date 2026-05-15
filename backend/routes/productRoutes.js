import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//  GET TODOS LOS PRODUCTOS

router.get("/", async (req, res)=> {
    try {
        const products = await Product.find();
        res.json(products);
    } 
        catch (error) {
            console.log(error)
            res.status (500) .json({ message: "Error al obtener productos", error: error.message});
        }     
});

router.delete("/", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "Todos los productos eliminados" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar productos" });
  }
});


//  POST CREAR PRODUCTOS

router.post("/", async (req, res) => {
  try {
    console.log("POST recibido:", req.body);

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    console.log("Guardado:", savedProduct);

    res.status(201).json(savedProduct);

  } catch (error) {
    console.log("ERROR POST:", error);

    res.status(500).json({
      message: "Error al crear producto",
      error: error.message
    });
  }
});

//  ELIMINAR PRODUCTO

router.delete("/:id", async (req, res)=> {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Producto eliminado",
    });
  }
  catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


//  ACTUALIZAR PRODUCTO

router.put("/:id", async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;