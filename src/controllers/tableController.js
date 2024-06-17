import Table from '../models/tableModel.js';

export const createTable = async (req, res) => {
  try {
    const { number, capacity } = req.body;
    const branchId = req.user.branch;

    const newTable = new Table({
      number,
      capacity,
      branch: branchId,
    });

    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTables = async (req, res) => {
  try {
    const branchId = req.user.branch;

    const tables = await Table.find({ branch: branchId });
    res.status(200).json(tables);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, capacity } = req.body;
    const branchId = req.user.branch;

    const updatedTable = await Table.findOneAndUpdate(
      { _id: id, branch: branchId },
      { number, capacity },
      { new: true, runValidators: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ error: 'Table not found' });
    }

    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const branchId = req.user.branch;

    const deletedTable = await Table.findOneAndDelete({ _id: id, branch: branchId });

    if (!deletedTable) {
      return res.status(404).json({ error: 'Table not found' });
    }

    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
