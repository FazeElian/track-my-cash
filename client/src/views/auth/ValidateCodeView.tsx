import { useForm } from "react-hook-form";
import { Toaster } from "sonner";

// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

// Mutation
import { useValidateCodeMutation } from "../../services/auth/mutations";

// Type
import type { ValidateCode } from "../../lib/types/modules/user.type";

// Error message component for fields validation
import { ErrorMessageValidation } from "../../components/company/ErrorMessageValidation";

const ValidateCodeView = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateCode> ({
        defaultValues: {
            code: ""
        }
    });

    // Mutation
    const validateCodeMutation = useValidateCodeMutation()
    const handleValidateCode = (formData: ValidateCode) => {
        validateCodeMutation.mutate(formData, {
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
                <form className="form-users" method="POST" onSubmit={handleSubmit(handleValidateCode)}>
                    <div className="top-form-users">
                        <img src={Logo} alt="" />
                        <h2>Introduce el código enviado a tu correo electrónico para restablecer tu contraseña</h2>
                    </div>

                    <div className="form-users-groups">
                        <div className="form-users-group">
                            <label htmlFor="code">Código</label>
                            <input
                                className="font-lexend"
                                type="text"
                                id="code"
                                placeholder="Introduce el código enviado a tu correo electrónico"
                                {...register("code", {
                                    required: "Código no válido",
                                    minLength: {
                                        value: 6,
                                        message: "Código no válido"
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: "Código no válido"
                                    }
                                })}
                            />
                            {errors.code && 
                                <ErrorMessageValidation>
                                    { errors.code?.message }
                                </ErrorMessageValidation>
                            }
                        </div>
                    </div>

                    <button className="btn-submit-form-users font-lexend" type="submit">
                        Reestablecer contraseña
                    </button>
                </form>
            </main>

            <Toaster position="top-center" richColors />
        </>
    )
}

export default ValidateCodeView