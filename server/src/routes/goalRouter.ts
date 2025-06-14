import { Router } from "express";

// Controller
import { GoalController } from "../controllers/GoalController";

// Middleware
import { authenticate } from "../middleware/auth";
import { handleInputErrors } from "../middleware/validation";
import {
    validateGoalId,
    validateGoalInput,
    validateIfGoalExists
} from "../middleware/goal";

// Router
const router = Router()

// ID param for CRUD
router.param("goalId", validateGoalId);
router.param("goalId", validateIfGoalExists);
router.param("goalId", authenticate);

// Routes
router.get("/goals",
    authenticate,
    GoalController.getAll
);

router.get("/goals/:goalId",
    authenticate,
    GoalController.getById
);

router.post("/goals/new",
    validateGoalInput,
    handleInputErrors,
    authenticate,
    GoalController.new
);

router.delete("/goals/:goalId",
    authenticate,
    GoalController.deleteById
);

export default router;