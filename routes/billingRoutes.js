const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  markAsPaid,
  deleteInvoice
} = require('../controllers/billingController');

const auth = require('../middleware/auth');

// جميع العمليات محمية
router.use(auth);

router.post('/', createInvoice);
router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id/pay', markAsPaid);
router.delete('/:id', deleteInvoice);

module.exports = router;
