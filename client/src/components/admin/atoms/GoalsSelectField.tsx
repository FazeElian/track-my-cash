import { Link } from "react-router-dom";

// Types
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";
import type { Goal } from "../../../lib/types/services/goal.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

const GoalsSelectField = ({ categoriesList, label, labelFor, error, ...rest }: SelectFieldProps) => {
    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            {(categoriesList?.length ?? 0) > 0 ? (
                <select {...rest} className="font-lexend">
                    <option value="" disabled>
                        Seleccionar
                    </option>
                    {categoriesList!.map((goal: Goal) => (
                        <option value={goal.id} key={goal.id}>
                            {goal.title}
                        </option>
                    ))}
                </select>
            ) : (
                <h2>
                    Aún no has añadido ninguna meta financiera
                    <Link to="/admin/goals">Añadir</Link>
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

export { GoalsSelectField };