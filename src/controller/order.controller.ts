import { Request, Response, NextFunction } from 'express';
import amqp from 'amqplib/callback_api';

const Order = require("../database/mongo/schema/order.schema");

//@desc     Get all orders
//@route    GET /api/v1/orders
//@access   Public
export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, failed: err });
  }
};

//@desc     Get single order
//@route    GET /api/v1/orders/:id
//@access   Public
export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, failed: err });
  }
};

//@desc     Create new order
//@routes   POST /api/v1/orders
//@access   Public
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.create(req.body);

    const { orderType } = req.body; 

    amqp.connect("amqp://localhost", function (error0, connection) {
      console.log("Connected");
      if (error0) {
        throw error0;
      }

      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var exchange = "direct_logs";
        var msg = JSON.stringify(req.body);

        channel.assertExchange(exchange, "direct", {
          durable: false,
        });

        channel.publish(exchange, orderType, Buffer.from(msg));
        console.log(" [RabbitMQ] Sent %s: '%s'", orderType, msg);
      });
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Update order
//@routes   PUT /api/v1/orders/:id
//@access   Public
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Delete order
//@routes   DELETE /api/v1/order/:id
//@access   Public
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order not found with id of ${req.params.id}`,
      });
    }
    // console.log(order);
    await order.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err);
  }
};
