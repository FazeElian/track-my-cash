// Type
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

// Categories list
import { Categories } from "../../../lib/lists/Categories";

const CategoriesSelectField = ({ label, labelFor, error, ...rest }: SelectFieldProps) => {
    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            <select {...rest} className="font-lexend">
                <option value="" disabled>
                    Seleccionar
                </option>
                {Categories.map((icon) => (
                    <option value={icon.value} key={icon.id}>
                        {icon.content}
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