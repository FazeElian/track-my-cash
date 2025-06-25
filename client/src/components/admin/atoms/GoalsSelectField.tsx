import { Link } from "react-router-dom";

// Types
import type { SelectFieldProps } from "../../../lib/types/atoms/select-field.type";
import type { Goal } from "../../../lib/types/services/goal.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";
import { useFetchAllGoals } from "../../../services/goals/queries";

const GoalsSelectField = ({ label, labelFor, error, ...rest }: SelectFieldProps) => {
    const { data: goalsList, isLoading } = useFetchAllGoals() 
    const goals : Goal[] = [] // Initialize array

    if (isLoading) return "Cargando..."
    
    if (!Array.isArray(goalsList)) {
        return (
            <div className="item-form-double-group form-group">
                <label htmlFor={labelFor}>{label}</label>
                <h2>
                    Aún no has añadido ninguna meta financiera
                    <Link to="/admin/goals">Añadir</Link>
                </h2>
            </div>
        )
    }

    // Select only the goals that are not completed
    goalsList.forEach(goal => {
        if(goal.state !== "Completed") {
            goals.push(goal)
        }
    });

    return (
        <div className="item-form-double-group form-group">
            <label htmlFor={labelFor}>{label}</label>
            {(goals?.length ?? 0) > 0 ? (
                <select {...rest} className="font-lexend" defaultValue="">
                    <option value="" key="">
                        🚫 Ninguna
                    </option>
                    {goals!.map((goal: Goal) => (
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