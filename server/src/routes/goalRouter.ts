import { Router } from "express";

// Controller
import { GoalController } from "../controllers/GoalController";

// Middleware
import { authenticate } from "../middleware/auth";
import { validateGoalInput } from "../middleware/goal";
import { handleInputErrors } from "../middleware/validation";

// Router
const router = Router()

// Routes
router.post("/goals/new",
    validateGoalInput,
    handleInputErrors,
    authenticate,
    GoalController.new
);

export default router;