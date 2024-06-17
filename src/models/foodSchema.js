import mongoose from 'mongoose';

const { Schema } = mongoose;

const foodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String },  // Assuming image is stored as URL or file path
    hotelBrand: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'HotelBrand',
        required: true
    }
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

export default Food;
