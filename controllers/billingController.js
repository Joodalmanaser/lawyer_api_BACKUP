const Billing = require('../models/Billing');


exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Billing.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Billing.find().populate('client case');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Billing.findById(req.params.id).populate('client case');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.markAsPaid = async (req, res) => {
  try {
    const invoice = await Billing.findByIdAndUpdate(req.params.id, { paid: true }, { new: true });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Billing.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
