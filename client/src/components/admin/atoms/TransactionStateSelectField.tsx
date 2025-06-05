// Type
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

const TransactionStateSelectField = ({ label, labelFor, error, ...rest }: SelectFieldProps) => {
    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            <select {...rest} className="font-lexend">
                <option value="" disabled>
                    Seleccionar
                </option>
                <option value="Completed" key="Completed">
                    Completada
                </option>
                <option value="Pending" key="Pending">
                    Pendiente
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

export { TransactionStateSelectField };