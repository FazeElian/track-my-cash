// Type
import type { ColorsInputField as ColorsInputFieldType } from "../../../lib/types/atoms/colors-input-field.type";

// Colors list
import { Colors } from "../../../lib/lists/Colors";

const ColorsInputField = ({ label, labelFor, setColor, color }: ColorsInputFieldType) => {
    return (
        <div className="form-group">
            <label htmlFor={labelFor}>{label}</label>
            <div className="form-group-colors">
                {Colors.map((c) => (
                    <span
                        key={c.id}
                        className={`color-circle ${color.id === c.id ? "selected" : ""}`}
                        style={{ backgroundColor: c.colorCode }}
                        onClick={() => setColor(c)}
                    />
                ))}
            </div>
        </div>
    )
}

export { ColorsInputField };