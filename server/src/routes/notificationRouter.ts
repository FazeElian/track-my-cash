import { Router } from "express";

// Controller
import { NotificationController } from "../controllers/NotificationController";

// Middleware
import { authenticate } from "../middleware/auth";

// Router
const router = Router()

// Routes
router.get("/notifications",
    authenticate,
    NotificationController.getAll
);

export default router;