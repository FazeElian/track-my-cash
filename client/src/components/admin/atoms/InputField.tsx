// Type
import type { InputFieldProps } from "../../../lib/types/atoms/input-field.type";

// Error validation component
import { ErrorMessageValidation } from "../../company/ErrorMessageValidation";

const InputField = ({ label, labelFor, error, ...rest }: InputFieldProps) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={labelFor}>{label}</label>
                <input {...rest} className="font-lexend" />
                {error && 
                    <ErrorMessageValidation>
                        {error.message}
                    </ErrorMessageValidation>
                }
            </div>
        </>
    )
}

export { InputField };