import express from "express";
import Order from "../models/Order.js";

const router = express.Router();


// CREAR PEDIDO

router.post("/", async (req, res) => {

    try {

        const newOrder = new Order(req.body);

        await newOrder.save();

        res.status(201).json({
            message: "Pedido Guardado",
            order: newOrder,
        });

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
});


// OBTENER PEDIDOS

router.get("/", async (req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
});


// ACTUALIZAR ESTADO DEL PEDIDO

router.put("/:id/status", async (req, res) => {

    try {

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            {
                new: true,
            }
        );

        res.json(updatedOrder);

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
});


// ELIMINAR PEDIDO

router.delete("/:id", async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.json({
            message: "Pedido eliminado",
        });

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
});

export default router;


