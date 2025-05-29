import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { useParams } from "react-router-dom";

// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

// Mutation
import { useResetPasswordMutation } from "../../services/auth/mutations";

// Type
import type { ResetPassword } from "../../lib/types/modules/user.type";

// Error message component for fields validation
import { ErrorMessageValidation } from "../../components/company/ErrorMessageValidation";

const ResetPasswordView = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ResetPassword> ({
        defaultValues: {
            password: ""
        }
    });

    // Code from params
    const { code } = useParams();

    // Mutation
    const resetPasswordMutation = useResetPasswordMutation(code ? code : "")
    const handleResetPassword = (formData: ResetPassword) => {
        resetPasswordMutation.mutate(formData, {
            onSuccess: () => {
                reset()
            },
            onError: (error) => {
                console.log(error)
            }
        });
    }

    return (
        <>
            <main className="users-module-view">
                <form className="form-users" method="POST" onSubmit={handleSubmit(handleResetPassword)}>
                    <div className="top-form-users">
                        <img src={Logo} alt="" />
                        <h2>Crea una nueva contraseña</h2>
                    </div>

                    <div className="form-users-groups">
                        <div className="form-users-group">
                            <label htmlFor="newPassword">Nueva contraseña</label>
                            <input
                                className="font-lexend"
                                type="text"
                                id="newPassword"
                                placeholder="Crea una nueva contraseña (mínimo 8 caracteres)"
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
                        Enviar código de recuperación
                    </button>
                </form>
            </main>

            <Toaster position="top-center" richColors />
        </>
    )
}

export default ResetPasswordView