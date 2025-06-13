// Type
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

const PriorityLevelSelectField = ({ label, labelFor, error, ...rest }: SelectFieldProps) => {
    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            <select {...rest} className="font-lexend">
                <option value="" disabled>
                    Seleccionar
                </option>
                <option value="Low" key="Low">
                    🟢 Baja
                </option>
                <option value="Medium" key="Medium">
                    🟡 Media
                </option>
                <option value="High" key="High">
                    🔴 Alta
                </option>
            </select>
            {error && 
                <ErrorMessageValidation>
                    {error.message}
                </ErrorMessageValidation>
            }
        </div>
    )
}

export { PriorityLevelSelectField };