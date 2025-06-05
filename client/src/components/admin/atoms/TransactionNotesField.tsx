// Error validation component
import type { TextAreaFieldProps } from "../../../lib/types/atoms/textarea-field.type";

const TransactionNotesField = ({ label, labelFor, ...rest }: TextAreaFieldProps) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={labelFor}>{label}</label>
                <textarea {...rest} className="font-lexend" />
            </div>
        </>
    )
}

export { TransactionNotesField };