import { useState } from "react";
import { useForm } from "react-hook-form";

// Styles for component
import "../../../assets/css/components/admin/Forms.css";

// Lists
import { Colors } from "../../../lib/lists/Colors";

// Mutation
import { useAddCategoryMutation } from "../../../services/categories/mutations";

// Types
import type { ModalFormPropsType } from "../../../lib/types/modal-form.type";
import type { AddCategory } from "../../../lib/types/services/category.type";
import type { Color } from "../../../lib/types/atoms/colors-input-field.type";

// Error message component for fields validation
import { InputField } from "../../../components/admin/atoms/InputField";
import { TypeSelectField } from "../../../components/admin/atoms/TypeSelectField";
import { IconSelectField } from "../../../components/admin/atoms/IconSelectField";
import { ColorsInputField } from "../../../components/admin/atoms/ColorsInputField";

const NewCategoryForm : React.FC<ModalFormPropsType> = ({ modalRef, onClose }) => {
    const [color, setColor] = useState<Color>(Colors[0]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddCategory> ({
        defaultValues: {
            name: "",
            type: "",
            icon: "",
            monthlyBudget: 0
        }
    });

    // Mutation
    const registerMutation = useAddCategoryMutation()
    const handleAddCategory = (formData: AddCategory) => {
        const categoryData = {
            ...formData,
            color: color.value
        }
        
        registerMutation.mutate(categoryData, {
            onSuccess: () => {
                reset()
                onClose()
            }
        });
    }

    return (
        <section className="modal-form-module">
            <form
                className="form-module"
                ref={modalRef}
                action=""
                method="POST"
                onSubmit={handleSubmit(handleAddCategory)}
            >
                <h1>Añadir categoría</h1>

                {/* Name */}
                <InputField
                    label="Nombre de la categoría"
                    labelFor="name"
                    id="name"
                    type="text"
                    placeholder="Ingresa el nombre de la categoría"
                    error={errors.name}
                    {...register("name", {
                        required: "El nombre de la categoría es un dato obligatorio.",
                        pattern: {
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s-]+$/,
                            message: "Solo se permiten letras, números y guiones."
                        },
                        maxLength: {
                            value: 50,
                            message: "El nombre no puede superar los 50 caracteres"
                        }
                    })}
                />

                {/* Divided group */}
                <div className="form-double-group">
                    <TypeSelectField
                        label="Tipo"
                        labelFor="type"
                        defaultValue=""
                        error={errors.type}
                        {...register("type", {
                            required: "El tipo de categoría es obligatorio.",
                            validate: value => value !== "" || "El tipo de categoría es obligatorio",
                        })}
                    />

                    {/* Icon */}
                    <IconSelectField
                        label="Icono"
                        labelFor="icon"
                        defaultValue=""
                        error={errors.icon}
                        {...register("icon", {
                            required: "El icono para la categoría es obligatorio.",
                            validate: value => value !== "" || "El icono para la categoría es obligatorio",
                        })}
                    />
                </div>
                
                {/* Color */}
                <ColorsInputField
                    label="Color"
                    labelFor="color"
                    setColor={setColor}
                    color={color}
                    error={errors.color}
                />

                {/* Monthly Budget */}
                <InputField
                    label="Presupuesto mensual (opcional)"
                    labelFor="monthlyBudget"
                    id="monthlyBudget"
                    type="number"
                    error={errors.monthlyBudget}
                    placeholder="$$$"
                    {...register("monthlyBudget", {
                        min: {
                            value: 0,
                            message: "El presupuesto no puede ser negativo."
                        }
                    })}
                />
                <button
                    type="submit"
                    className="btn-submit-form-module font-lexend"
                >
                    Añadir Categoría
                </button>
            </form>
        </section>
    )
}

export default NewCategoryForm