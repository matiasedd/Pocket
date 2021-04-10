import { Router } from "express";

import user from "./controllers/userController";
import transaction from "./controllers/transactionController";

const router = Router();

router.get("/users", user.listAll);
router.get("/users/:userid", user.listUser);
router.get("/users/:userid/transactions", transaction.listAll);
router.get(
  "/users/:userid/transactions/:transactionid",
  transaction.listTransaction
);

router.post("/users/add", user.add);
router.post("/users/:userid/transactions/add", transaction.add);

router.put("/users/:userid/update", user.update);
router.put(
  "/users/:userid/transactions/:transactionid/update",
  transaction.update
);

router.delete("/users/:userid/delete", user.delete);
router.delete(
  "/users/:userid/transactions/:transactionid/delete",
  transaction.delete
);

module.exports = router;
