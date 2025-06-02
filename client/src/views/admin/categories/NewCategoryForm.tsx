import { useState } from "react";
import { useForm } from "react-hook-form";

// Styles for component
import "../../../assets/css/components/admin/Forms.css";

// Lists
import { Icons } from "../../../lib/lists/Icons";
import { Colors } from "../../../lib/lists/Colors";

// Mutation
import { useAddCategoryMutation } from "../../../services/categories/mutations";

// Query
import { useFetchAllCategories } from "../../../services/categories/queries";

// Types
import type { ModalFormPropsType } from "../../../lib/types/modal-form.type";
import type { AddCategory } from "../../../lib/types/services/category.type";

// Error message component for fields validation
import { ErrorMessageValidation } from "../../../components/company/ErrorMessageValidation";

const NewCategoryForm : React.FC<ModalFormPropsType> = ({ modalRef, onClose }) => {
    const [color, setColor] = useState(Colors[0]);
    const { refetch } = useFetchAllCategories();

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
                refetch()
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
                <div className="form-group">
                    <label htmlFor="name">Nombre de la categoría</label>
                    <input
                        className="font-lexend"
                        id="name"
                        type="text"
                        placeholder="Ingresa el nombre de la categoría"
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
                    {errors.name && 
                        <ErrorMessageValidation>
                            { errors.name?.message }
                        </ErrorMessageValidation>
                    }
                </div>
                <div className="form-double-group">
                    <div className="item-form-double-group form-group">
                        <label htmlFor="type">Tipo</label>
                        <select
                            className="font-lexend"
                            id="type"
                            defaultValue=""
                            {...register("type", {
                                required: "El tipo de categoría es obligatorio.",
                                validate: value => value !== "" || "El tipo de categoría es obligatorio",
                            })}
                        >
                            <option value="" disabled>
                                Selecciona un tipo
                            </option>
                            <option value="Expense" key="Expense">
                                Gastos
                            </option>
                            <option value="Income" key="Income">
                                Ingresos
                            </option>
                        </select>

                        {errors.type && 
                            <ErrorMessageValidation>
                                { errors.type?.message }
                            </ErrorMessageValidation>
                        }
                    </div>
                    <div className="item-form-double-group form-group">
                        <label htmlFor="name">Icono</label>
                        <select
                            className="font-lexend"
                            id="icon"
                            defaultValue=""
                            {...register("icon", {
                                required: "El icono para la categoría es obligatorio.",
                                validate: value => value !== "" || "El icono para la categoría es obligatorio",
                            })}
                        >
                            <option value="" disabled>
                                Selecciona un icono
                            </option>
                            {Icons.map((icon) => (
                                <option value={icon.value} key={icon.id}>
                                    {icon.content}
                                </option>
                            ))}
                        </select>
                        {errors.icon && 
                            <ErrorMessageValidation>
                                { errors.icon?.message }
                            </ErrorMessageValidation>
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <div className="form-group-colors">
                        {Colors.map((c) => (
                            <span
                                key={c.id}
                                className={`color-circle ${color.id === c.id ? "selected" : ""}`}
                                style={{ backgroundColor: c.colorCode }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="monthlyBudget">Presupuesto mensual (opcional)</label>
                    <input
                        className="font-lexend"
                        id="monthlyBudget"
                        type="number"
                        placeholder="0"
                        {...register("monthlyBudget")}
                    />
                </div>
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