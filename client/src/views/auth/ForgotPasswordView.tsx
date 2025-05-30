import { useForm } from "react-hook-form";
import { Toaster } from "sonner";

// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

// Mutation
import { useForgotPasswordMutation } from "../../services/auth/mutations";

// Type
import type { ForgotPassword } from "../../lib/types/services/user.type";

// Error message component for fields validation
import { ErrorMessageValidation } from "../../components/company/ErrorMessageValidation";

const LoginView = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPassword> ({
        defaultValues: {
            email: "",
        }
    });

    // Mutation
    const forgotPasswordMutation = useForgotPasswordMutation()
    const handleForgotPassword = (formData: ForgotPassword) => {
        forgotPasswordMutation.mutate(formData, {
            onSuccess: () => {
                reset()
            }
        });
    }

    return (
        <>
            <main className="users-module-view">
                <form className="form-users" method="POST" onSubmit={handleSubmit(handleForgotPassword)}>
                    <div className="top-form-users">
                        <img src={Logo} alt="" />
                        <h2>Solicita un código a tu correo electrónico para restablecer tu contraseña.</h2>
                    </div>

                    <div className="form-users-groups">
                        <div className="form-users-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                className="font-lexend"
                                type="email"
                                id="email"
                                placeholder="Ingresa el correo electrónico asociado a tu cuenta"
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
                    </div>

                    <button className="btn-submit-form-users font-lexend" type="submit">
                        Enviar código de recuperación
                    </button>
                </form>
            </main>

            <Toaster position="top-center" richColors />
        </>
    )
}

export default LoginView