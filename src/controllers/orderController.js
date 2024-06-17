import Order from '../models/orderSchema.js';
import Table from '../models/tableModel.js';
import Food from '../models/FoodSchema.js';
export const createOrder = async (req, res) => {
  try {
    const { tableId, foods } = req.body;
    
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    const orderFoods = await Food.find({ '_id': { $in: foods } });
    const totalAmount = orderFoods.reduce((sum, food) => sum + food.price, 0);

    const newOrder = new Order({
      table: tableId,
      foods,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('table').populate('foods');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { foods, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { foods, status },
      { new: true, runValidators: true }
    ).populate('table').populate('foods');

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
