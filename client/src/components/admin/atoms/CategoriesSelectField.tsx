// Types
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";
import type { Category } from "../../../lib/types/services/category.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

const CategoriesSelectField = ({ categoriesList, label, labelFor, error, ...rest }: SelectFieldProps) => {
    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            <select {...rest} className="font-lexend">
                <option value="" disabled>
                    Seleccionar
                </option>
                {categoriesList?.map((category: Category) => (
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {error && 
                <ErrorMessageValidation>
                    {error.message}
                </ErrorMessageValidation>
            }
        </div>
    )
}

export { CategoriesSelectField };