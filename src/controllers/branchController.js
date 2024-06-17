import Branch from '../models/branchModel.js';
import User from '../models/userModel.js';

export const createBranch = async (req, res) => {
  try {
    // Extract branch details and branch admin user details from the request body
    const { name, address, phone, branchAdminName, branchAdminEmail, branchAdminPassword } = req.body;

    // Get the hotel brand ID from the authenticated user's token
    const hotelBrandId = req.user.hotelBrand;

    // Create a new branch admin user
    const branchAdminUser = new User({
      name: branchAdminName,
      email: branchAdminEmail,
      password: branchAdminPassword,
      role: 'sub-admin',
      hotelBrand: hotelBrandId,
    });
    await branchAdminUser.save();

    // Create a new branch associated with the hotel brand and the branch admin
    const newBranch = new Branch({
      name,
      address,
      phone,
      adminUser: branchAdminUser._id,
      hotelBrand: hotelBrandId,
    });
    await newBranch.save();
    branchAdminUser.branch = newBranch._id;
    await branchAdminUser.save();

    // Respond with the newly created branch
    res.status(201).json(newBranch);
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
};

export const getBranches = async (req, res) => {
    try {
        let branches;
        if (req.user.role === 'sub-admin') {
            // If the user is a sub-admin, fetch only the branch associated with the user
            branches = await Branch.find({ _id: req.user.branch }).populate('adminUser');
        } else {
            // If the user is not a sub-admin, fetch all branches associated with the hotel brand
            branches = await Branch.find({ hotelBrand: req.user.hotelBrand }).populate('adminUser');
        }
        res.status(200).json(branches);
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};

export const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone } = req.body;

        const branch = await Branch.findById(id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        branch.name = name || branch.name;
        branch.address = address || branch.address;
        branch.phone = phone || branch.phone;

        await branch.save();
        res.status(200).json(branch);
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};

export const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;

        const branch = await Branch.findByIdAndDelete(id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        res.status(200).json({ message: 'Branch deleted' });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};
