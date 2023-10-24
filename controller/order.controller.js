const Order = require("../model/Order");

//@desc     Get all orders
//@route    GET /api/v1/orders
//@access   Public
exports.getOrders = async (req, res, next) => {
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
exports.getOrder = async (req, res, next) => {
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
exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);

    const { orderType } = req.body; 

    amqp
      .connect("amqp://localhost")
      .then((connection) => connection.createChannel())
      .then((channel) => {
        console.log("Channel is ready for use!");

        const exchange = "direct_logs";

        channel.assertExchange(exchange, "direct", {
          durable: false,
        });

        channel.publish(exchange, orderType, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", orderType, msg);
      })
      .catch((error) => {
        console.error("Error connecting to RabbitMQ", error);
      });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Update order
//@routes   PUT /api/v1/orders/:id
//@access   Public
exports.updateOrder = async (req, res, next) => {
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
exports.deleteOrder = async (req, res, next) => {
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
