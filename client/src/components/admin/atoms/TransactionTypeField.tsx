// Type
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

const TransactionTypeField = ({ label, labelFor, error, ...rest }: SelectFieldProps) => {
    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            <select {...rest} className="font-lexend">
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
            {error && 
                <ErrorMessageValidation>
                    {error.message}
                </ErrorMessageValidation>
            }
        </div>
    )
}

export { TransactionTypeField };