import { useForm } from "react-hook-form";
import { Toaster } from "sonner";

// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

// Mutation
import { useConfirmAccountMutation } from "../../services/auth/mutations";

// Type
import type { ConfirmUserAccount } from "../../lib/types/modules/user.type";

// Error message component for fields validation
import { ErrorMessageValidation } from "../../components/company/ErrorMessageValidation";

const ConfirmAccountView = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ConfirmUserAccount> ({
        defaultValues: {
            code: ""
        }
    });

    // Mutation
    const confirmAccountMutation = useConfirmAccountMutation()
    const handleConfirmAccount = (formData: ConfirmUserAccount) => {
        confirmAccountMutation.mutate(formData, {
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
                <form className="form-users" method="POST" onSubmit={handleSubmit(handleConfirmAccount)}>
                    <div className="top-form-users">
                        <img src={Logo} alt="" />
                        <h2>Confirme su cuenta utilizando el código enviado a su correo electrónico</h2>
                    </div>

                    <div className="form-users-groups">
                        <div className="form-users-group">
                            <label htmlFor="code">Código de Confirmación</label>
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
                        Confirmar cuenta
                    </button>
                </form>
            </main>

            <Toaster position="top-center" richColors />
        </>
    )
}

export default ConfirmAccountView