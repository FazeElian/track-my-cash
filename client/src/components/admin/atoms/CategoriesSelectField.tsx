import { Link } from "react-router-dom";

// Types
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";
import type { Category } from "../../../lib/types/services/category.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

const CategoriesSelectField = ({ categoriesList, label, labelFor, error, ...rest }: SelectFieldProps) => {
    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            {(categoriesList?.length ?? 0) > 0 ? (
                <select {...rest} className="font-lexend">
                    <option value="" disabled>
                        Seleccionar
                    </option>
                    {categoriesList!.map((category: Category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            ) : (
                <h2>
                    Aún no has añadido ninguna categoría
                    <Link to="/admin/categories">Añadir</Link>
                </h2>
            )}
            {error && 
                <ErrorMessageValidation>
                    {error.message}
                </ErrorMessageValidation>
            }
        </div>
    )
}

export { CategoriesSelectField };