import type { SelectHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    labelFor: string;
    error?: FieldError;
}