import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }],
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
