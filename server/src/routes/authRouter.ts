import { Router } from "express";
import { body } from "express-validator";

// Controller
import { AuthController } from "../controllers/AuthController";

// Middleware
import { handleInputErrors } from "../middleware/validation";

// Router
const router = Router()

// Routes
router.post("/register",
    body("userName")
        .notEmpty().withMessage("Por favor, introduzca un nombre de usuario.")
        .isLength({ min: 4 }).withMessage("El nombre de usuario debe tener al menos 4 caracteres."),
    body("email")
        .isEmail().withMessage("Por favor, introduzca una dirección de correo electrónico válida.")
        .notEmpty().withMessage("Por favor, introduzca una dirección de correo electrónico."),
    body("password")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .notEmpty().withMessage("Por favor, introduzca una contraseña."),
    handleInputErrors,
    AuthController.register
);

router.post("/login",
    body("email")
        .isEmail().withMessage("Por favor, introduzca una dirección de correo electrónico válida.")
        .notEmpty().withMessage("Por favor, introduzca una dirección de correo electrónico."),
    body("password")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .notEmpty().withMessage("Por favor, introduzca una contraseña."),
    handleInputErrors,
    AuthController.login
);

export default router;