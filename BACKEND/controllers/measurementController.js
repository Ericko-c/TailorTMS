const Measurement = require('../models/Measurement');

// Add a new measurement
exports.addMeasurement = async (req, res) => {
  try {
    const measurement = new Measurement(req.body);
    await measurement.save();
    res.status(201).json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get measurements by customer ID
exports.getMeasurementsByCustomerId = async (req, res) => {
  try {
    const measurements = await Measurement.find({ customerId: req.params.customerId });
    res.status(200).json(measurements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a measurement
exports.updateMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!measurement) {
      return res.status(404).json({ message: 'Measurement not found' });
    }
    res.status(200).json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a measurement
exports.deleteMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findByIdAndDelete(req.params.id);
    if (!measurement) {
      return res.status(404).json({ message: 'Measurement not found' });
    }
    res.status(200).json({ message: 'Measurement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
