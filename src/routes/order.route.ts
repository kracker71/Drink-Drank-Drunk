import express from 'express'; 

const { getOrders, getOrder, createOrder, updateOrder, deleteOrder } = require("../controller/order.controller")

const orderRoutes = express.Router();

orderRoutes.route("/").get(getOrders).post(createOrder)
orderRoutes.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder)

export default orderRoutes;