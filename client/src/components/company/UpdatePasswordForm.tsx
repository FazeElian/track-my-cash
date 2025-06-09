import { useForm } from "react-hook-form";

// React icons
import { MdOutlineSecurity } from "react-icons/md";

// Input components
import { InputField } from "../admin/atoms/InputField";

// Type
import type { UpdatePassword } from "../../lib/types/services/user.type";

// Mutation
import { useUpdatePasswordMutation } from "../../services/auth/mutations";

const UpdatePasswordForm = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<UpdatePassword> ({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    const newPassword = watch("newPassword");

    // Mutation
    const updatePasswordMutation = useUpdatePasswordMutation()
    const handleUpdatePassword = (formData: UpdatePassword) => {
        updatePasswordMutation.mutate(formData, {
            onSuccess: () => {
                reset()
            }
        });
    }

    return (
        <form
            className="item-profile"
            method="POST"
            onSubmit={handleSubmit(handleUpdatePassword)}
        >
            <h1>
                <MdOutlineSecurity />
                Seguridad de la Cuenta
            </h1>

            <h2>Cambiar Contraseña</h2>

            {/* Current password */}
            <InputField
                label="Contraseña Actual"
                labelFor="currentPassword"
                id="currentPassword"
                type="text"
                placeholder="Ingresa tu contraseña actual para verificar tu identidad."
                error={errors.currentPassword}
                {...register("currentPassword", {
                    required: "La contraseña actual es un dato obligatorio.",
                    minLength: {
                        value: 8,
                        message: "La contraseña debe tener al menos 8 caracteres"
                    }
                })}
            />

            {/* New password */}
            <InputField
                label="Nueva Contraseña"
                labelFor="newPassword"
                id="newPassword"
                type="text"
                error={errors.newPassword}
                placeholder="Ingresa tu nueva contraseña"
                {...register("newPassword", {
                    required: "La nueva contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "Debe tener al menos 6 caracteres",
                    },
                    validate: value =>
                        value !== watch("currentPassword") ||
                        "La nueva contraseña debe ser diferente a la actual"
                })}
            />

            {/* Confirm new password */}
            <InputField
                label="Contraseña actual"
                labelFor="currentPassword"
                id="currentPassword"
                type="text"
                error={errors.confirmPassword}
                placeholder="Confirma tu nueva contraseña"
                {...register("confirmPassword", {
                    required: "Confirma tu nueva contraseña",
                    validate: value =>
                        value === newPassword ||
                        "Las contraseñas no coinciden"
                })}
            />

            <div className="btm-item-profile">
                <button
                    type="submit"
                    className="btn-edit-profile font-lexend"
                >
                    <MdOutlineSecurity />
                    Actualizar contraseña
                </button>
            </div>
        </form>
    )
}

export { UpdatePasswordForm };