import { Router } from 'express';

import user from './controllers/userController';
import transaction from './controllers/transactionController';

const router = Router();

router.get('/users', user.listAll);
router.get('/users/:user_id', user.listUser);

router.get('/users/:user_id/transactions', transaction.listAll);
router.get('/users/:user_id/transactions/:transaction_id', transaction.listTransaction);

router.post('/users', user.add);

router.put('/users/:user_id', user.update);
router.put('/users/:user_id/transactions/:transaction_id', transaction.update);

router.delete('/users/:user_id', user.delete);
router.delete('/users/:user_id/transactions/:transaction_id', transaction.delete);

module.exports = router;