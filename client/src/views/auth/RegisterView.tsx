import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";

// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

// Mutation
import { useRegisterMutation } from "../../services/auth/mutations";

// Type
import type { RegisterUser } from "../../lib/types/services/user.type";

// Error message component for fields validation
import { ErrorMessageValidation } from "../../components/company/ErrorMessageValidation";

const RegisterView = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterUser> ({
        defaultValues: {
            email: "",
            userName: "",
            password: ""
        }
    });

    // Mutation
    const registerMutation = useRegisterMutation()
    const handleRegister = (formData: RegisterUser) => {
        registerMutation.mutate(formData, {
            onSuccess: () => {
                reset()
            }
        });
    }

    return (
        <>
            <main className="users-module-view">
                <form className="form-users" method="POST" onSubmit={handleSubmit(handleRegister)}>
                    <div className="top-form-users">
                        <img src={Logo} alt="" />
                        <h2>Únete y gestiona tus finanzas de manera más inteligente</h2>
                    </div>

                    <div className="form-users-groups">
                        <div className="form-users-group">
                            <label htmlFor="userName">Nombre de Usuario</label>
                            <input
                                className="font-lexend"
                                type="text"
                                id="userName"
                                placeholder="Crea un nombre de usuario para tu cuenta"
                                {...register("userName", {
                                    required: "Por favor, ingresa un nombre de usuario",
                                    minLength: {
                                        value: 4,
                                        message: "El nombre de usuario debe tener al menos 4 caracteres."
                                    }
                                })}
                            />
                            {errors.userName && 
                                <ErrorMessageValidation>
                                    { errors.userName?.message }
                                </ErrorMessageValidation>
                            }
                        </div>
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
                                placeholder="Crea una contraseña segura"
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
                        </div>
                    </div>

                    <button className="btn-submit-form-users font-lexend" type="submit">
                        Crear mi cuenta
                    </button>

                    <Link to="/auth/login" className="link-users-form-btm">
                        Ya tienes una cuenta? Iniciar sesión
                    </Link>
                </form>
            </main>

            <Toaster position="top-center" richColors />
        </>
    )
}

export default RegisterView