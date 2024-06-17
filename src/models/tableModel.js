import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
}, { timestamps: true });

const Table = mongoose.model('Table', tableSchema);

export default Table;
