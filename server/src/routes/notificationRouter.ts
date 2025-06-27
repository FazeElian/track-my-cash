import { Router } from "express";

// Controller
import { NotificationController } from "../controllers/NotificationController";

// Middleware
import { authenticate } from "../middleware/auth";
import { validateIfNotificationExists, validateNotificationId } from "../middleware/notification";

// Router
const router = Router()

// ID param for CRUD
router.param("notificationId", validateNotificationId);
router.param("notificationId", validateIfNotificationExists);
router.param("notificationId", authenticate);

// Routes
router.get("/notifications",
    authenticate,
    NotificationController.getAll
);

router.put("/notifications/markAsRead/:notificationId",
    authenticate,
    NotificationController.markAsRead
);

export default router;