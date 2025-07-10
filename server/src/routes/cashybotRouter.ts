import { Router } from "express";

// Middleware
import { authenticate } from "../middleware/auth";

// Controller
import { CashybotController } from "../controllers/CashybotController";

// Router
const router = Router()

router.post("/cashybot/new",
    authenticate,
    CashybotController.new
);

export default router;