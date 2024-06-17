import HotelBrand from '../models/hotelBrandModel.js';
import User from '../models/userModel.js';

export const createHotelBrand = async (req, res) => {
  try {
    const { name, address, phone, adminName, adminEmail, adminPassword } = req.body;

    // Check if admin user already exists
    let existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create admin user
    const adminUser = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    await adminUser.save();

    // Create hotel brand
    const newHotelBrand = new HotelBrand({
      name,
      address,
      phone,
      adminUser: adminUser._id, // Assign admin user to the hotel brand
    });
    await newHotelBrand.save();

    // Update hotel brand reference in admin user
    adminUser.hotelBrand = newHotelBrand._id;
    await adminUser.save();

    res.status(201).json(newHotelBrand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllHotelBrands = async (req, res) => {
  try {
    const hotelBrands = await HotelBrand.find();
    res.status(200).json(hotelBrands);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getHotelBrand = async (req, res) => {
  try {
    const hotelBrand = await HotelBrand.findOne({ adminUser: req.user._id });
    if (!hotelBrand) {
      return res.status(404).json({ error: 'Hotel brand not found' });
    }
    res.status(200).json(hotelBrand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateHotelBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    const hotelBrand = await HotelBrand.findById(id);
    if (!hotelBrand) {
      return res.status(404).json({ message: 'Hotel brand not found' });
    }

    hotelBrand.name = name || hotelBrand.name;
    hotelBrand.address = address || hotelBrand.address;
    hotelBrand.phone = phone || hotelBrand.phone;

    await hotelBrand.save();
    res.status(200).json(hotelBrand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHotelBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const hotelBrand = await HotelBrand.findByIdAndDelete(id);
    if (!hotelBrand) {
      return res.status(404).json({ message: 'Hotel brand not found' });
    }

    res.status(200).json({ message: 'Hotel brand deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
