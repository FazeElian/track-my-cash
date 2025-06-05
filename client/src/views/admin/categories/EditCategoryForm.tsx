import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Styles for component
import "../../../assets/css/components/admin/Forms.css";

// Lists
import { Colors } from "../../../lib/lists/Colors";

// Mutation
import { useUpdateCategoryMutation } from "../../../services/categories/mutations";

// Types
import type { ModalEditFormPropsType } from "../../../lib/types/modal-form.type";
import type { CategoryForm } from "../../../lib/types/services/category.type";
import type { Color } from "../../../lib/types/atoms/colors-input-field.type";

// Components for this view - form
import { InputField } from "../../../components/admin/atoms/InputField";
import { TypeSelectField } from "../../../components/admin/atoms/TypeSelectField";
import { IconSelectField } from "../../../components/admin/atoms/IconSelectField";
import { ColorsInputField } from "../../../components/admin/atoms/ColorsInputField";

// Query
import { useGetCategoryById } from "../../../services/categories/queries";

const EditCategoryForm : React.FC<ModalEditFormPropsType> = ({ id, modalRef, onClose }) => {
    const [color, setColor] = useState<Color>(Colors[0]);

    // Mutation
    const updateMutation = useUpdateCategoryMutation(id);

    // Get category
    const { data: category, isLoading } = useGetCategoryById(id); 

    // Initalize form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryForm> ({
        defaultValues: {}
    });
    
    // Update the fields when the category is obtained
    useEffect(() => {
        if (category && !(category instanceof Error)) {
            reset(category);
            const colorFromCategory = Colors.find(c => c.value === category.color);
            if (colorFromCategory) setColor(colorFromCategory);
        }
    }, [category, reset]);

    // Mutation
    const handleUpdateCategory = (formData: CategoryForm) => {
        const categoryData = {
            ...formData,
            color: color.value
        }
        updateMutation.mutate(categoryData, {
            onSuccess: () => {
                onClose()
            }
        });
    }

    if (isLoading) {
        return <section className="modal-form-module"><div style={{ color: "white" }}>Cargando detalles de la categoría...</div></section>;
    }

    return (
        <section className="modal-form-module">
            <form
                className="form-module"
                ref={modalRef}
                action=""
                method="POST"
                onSubmit={handleSubmit(handleUpdateCategory)}
            >
                <h1>Editar categoría</h1>
                {updateMutation.isError && (
                    <div style={{ color: 'red', marginBottom: '15px' }}>
                        Error al guardar cambios: {updateMutation.error?.message || 'Error desconocido al actualizar.'}
                    </div>
                )}
                {/* Opcional: mostrar un estado de carga mientras se guarda */}
                {updateMutation.isPending && (
                    <div style={{ color: 'blue', marginBottom: '15px' }}>Guardando cambios...</div>
                )}

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
                    Guardar cambios
                </button>
            </form>
        </section>
    )
}

export default EditCategoryForm