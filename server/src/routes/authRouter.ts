import { Router } from "express";
import { body, param } from "express-validator";

// Controller
import { AuthController } from "../controllers/AuthController";

// Middleware
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

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

router.get("/user",
    authenticate,
    AuthController.getUser
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

router.post("/confirm-account",
    body("code")
        .notEmpty()
        .isLength({ min: 6, max: 6  })
        .withMessage("Código no válido"),
    handleInputErrors,
    AuthController.confirmAccount
);

router.post("/forgot-password",
    body("email")
        .isEmail().withMessage("Por favor, introduzca una dirección de correo electrónico válida.")
        .notEmpty().withMessage("Por favor, introduzca una dirección de correo electrónico."),
    handleInputErrors,
    AuthController.forgotPassword
);

router.post("/validate-code",
    body("code")
        .notEmpty()
        .isLength({ min: 6, max: 6  })
        .withMessage("Código no válido"),
    AuthController.validateCode
);

router.post("/reset-password/:code",
    param("code")
        .notEmpty()
        .isLength({ min: 6, max: 6  })
        .withMessage("Código no válido"),
    body("password")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .notEmpty().withMessage("Por favor, introduzca una contraseña."),
    handleInputErrors,
    AuthController.resetPasswordWithCode
);

router.post("/update-password",
    authenticate,
    body("currentPassword")
        .notEmpty().withMessage("Por favor, introduzca su contraseña actual."),
    body("newPassword")
        .isLength({ min: 8 }).withMessage("La nueva contraseña debe tener al menos 8 caracteres.")
        .notEmpty().withMessage("Por favor, introduzca una nueva contraseña."),
    handleInputErrors,
    AuthController.updatePassword
);

export default router;