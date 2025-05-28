import { Router } from "express";
import { body, param } from "express-validator";

// Controller
import { TransactionController } from "../controllers/TransactionController";

// Middleware
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import {
    validateTransactionId,
    validateTransactionInput,
    validateIfTransactionExists
} from "../middleware/transaction";

// Router
const router = Router()


// ID param for CRUD
router.param("transactionId", validateTransactionId);
router.param("transactionId", validateIfTransactionExists);
router.param("transactionId", authenticate);

// Routes
router.get("/transactions",
    authenticate,
    TransactionController.getAll
);

router.get("/transactions/:transactionId",
    authenticate,
    TransactionController.getById
)

router.post("/transactions/new",
    validateTransactionInput,
    handleInputErrors,
    authenticate,
    TransactionController.new
);

router.put("/transactions/:transactionId",
    validateTransactionInput,
    handleInputErrors,
    authenticate,
    TransactionController.updateById
);

router.delete("/transactions/:transactionId",
    authenticate,
    TransactionController.deleteById
);

export default router;