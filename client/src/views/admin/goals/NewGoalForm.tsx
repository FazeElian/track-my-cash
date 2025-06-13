import { useState } from "react";
import { useForm } from "react-hook-form";

// Styles for component
import "../../../assets/css/components/admin/Forms.css";

// Lists
import { Colors } from "../../../lib/lists/Colors";

// Mutation
// import { useAddCategoryMutation } from "../../../services/categories/mutations";

// Types
import type { ModalFormPropsType } from "../../../lib/types/modal-form.type";
import type { GoalForm } from "../../../lib/types/services/goal.type";
import type { Color } from "../../../lib/types/atoms/colors-input-field.type";

// Components for this view - form
import { InputField } from "../../../components/admin/atoms/InputField";
import { CategoriesSelectField } from "../../../components/admin/atoms/CategoriesSelectField";
import { ColorsInputField } from "../../../components/admin/atoms/ColorsInputField";
import { TextAreaField } from "../../../components/admin/atoms/TextAreaField";

const NewGoalForm : React.FC<ModalFormPropsType> = ({ modalRef, onClose }) => {
    const [color, setColor] = useState<Color>(Colors[0]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<GoalForm> ({
        defaultValues: {
            title: "",
            description: "",
            amount: 0,
            deadline: "",
            category: "",
            color: "",
        }
    });

    // Mutation
    // const registerMutation = useAddCategoryMutation()
    const handleAddCategory = (formData: GoalForm) => {
        const categoryData = {
            ...formData,
            color: color.value
        }
        console.log(categoryData)
        reset()
        onClose()
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
                <h1>Añadir meta</h1>

                {/* Title */}
                <InputField
                    label="Nombre de la meta"
                    labelFor="title"
                    id="title"
                    type="text"
                    placeholder="Ingresa el nombre de la meta"
                    error={errors.title}
                    {...register("title", {
                        required: "El nombre de la meta es un dato obligatorio.",
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
                    {/* Category */}
                    <CategoriesSelectField
                        label="Categoría"
                        labelFor="category"
                        defaultValue=""
                        error={errors.category}
                        {...register("category", {
                            required: "La categoría de la meta es un dato obligatorio.",
                            validate: value => value !== "" || "La categoría de la meta es un dato obligatorio.",
                        })}
                    />

                    <InputField
                        label="Fecha límite"
                        labelFor="deadline"
                        id="deadline"
                        type="date"
                        placeholder="Ingresa el título del movimiento"
                        error={errors.deadline}
                        {...register("deadline", {
                            required: "La fecha del movimiento es un dato obligatorio.",
                        })}
                    />
                </div>

                {/* Description */}
                <TextAreaField
                    label="Descripción (opcional)"
                    labelFor="description"
                    id="description"
                    placeholder="Añade una descripción a la meta"
                    {...register("description")}
                />
                
                {/* Color */}
                <ColorsInputField
                    label="Color"
                    labelFor="color"
                    setColor={setColor}
                    color={color}
                />

                {/* Amount */}
                <InputField
                    label="Cantidad objetivo"
                    labelFor="amount"
                    id="amount"
                    type="number"
                    placeholder="$$$"
                    error={errors.amount}
                    {...register("amount", {
                        required: "La cantidad objetivo es obligatoria",
                        min: {
                            value: 0,
                            message: "La cantidad objetivo no puede ser negativa."
                        },
                        validate: value => value !== 0 || "La categoría de la meta es un dato obligatorio.",
                    })}
                />

                <button
                    type="submit"
                    className="btn-submit-form-module font-lexend"
                >
                    Añadir Meta
                </button>
            </form>
        </section>
    )
}

export default NewGoalForm