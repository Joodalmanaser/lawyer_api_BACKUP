const express = require('express');
const router = express.Router();
const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

const auth = require('../middleware/auth');

// جميع العمليات محمية
router.use(auth);

router.post('/', createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
