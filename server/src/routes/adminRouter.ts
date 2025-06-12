import { Router } from "express";

// Controller
import { AdminController } from "../controllers/AdminController";

// Middleware
import { authenticate } from "../middleware/auth";

// Router
const router = Router()

// Routes
router.get("/dashboard/stats",
    authenticate,
    AdminController.getStats
);
router.get("/dashboard/summary",
    authenticate,
    AdminController.getSummary
);

export default router;