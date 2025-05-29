import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";

// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

// Mutation
import { useLoginMutation } from "../../services/auth/mutations";

// Type
import type { LoginUser } from "../../lib/types/modules/user.type";

// Error message component for fields validation
import { ErrorMessageValidation } from "../../components/company/ErrorMessageValidation";

const LoginView = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginUser> ({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Mutation
    const loginMutation = useLoginMutation()
    const handleLogin = (formData: LoginUser) => {
        loginMutation.mutate(formData, {
            onSuccess: () => {
                reset()
            }
        });
    }

    return (
        <>
            <main className="users-module-view">
                <form className="form-users" method="POST" onSubmit={handleSubmit(handleLogin)}>
                    <div className="top-form-users">
                        <img src={Logo} alt="" />
                        <h2>Ingresa tus credenciales para acceder a tu panel</h2>
                    </div>

                    <div className="form-users-groups">
                        <div className="form-users-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                className="font-lexend"
                                type="email"
                                id="email"
                                placeholder="Ingresa tu correo electrónico"
                                {...register("email", {
                                    required: "El correo electrónico es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Por favor, ingresa un correo electrónico válido"
                                    }
                                })}
                            />
                            {errors.email && 
                                <ErrorMessageValidation>
                                    { errors.email?.message }
                                </ErrorMessageValidation>
                            }
                        </div>
                        <div className="form-users-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                className="font-lexend"
                                type="password"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                {...register("password", {
                                    required: "Debes ingresar una contraseña.",
                                    minLength: {
                                        value: 8,
                                        message: "La contraseña debe tener al menos 8 caracteres."
                                    }
                                })}
                            />
                            {errors.password && 
                                <ErrorMessageValidation>
                                    { errors.password?.message }
                                </ErrorMessageValidation>
                            }
                            <Link to="/auth/forgot-password" className="link-password-users-form">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>

                    <button className="btn-submit-form-users font-lexend" type="submit">
                        Iniciar Sesión
                    </button>

                    <Link to="/auth/register" className="link-users-form-btm">
                        ¿No tienes una cuenta? Crear mi cuenta
                    </Link>
                </form>
            </main>

            <Toaster position="top-center" richColors />
        </>
    )
}

export default LoginView