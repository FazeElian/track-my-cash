import type { SelectHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import type { Category } from "../services/category.type";

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    labelFor: string;
    error?: FieldError;
    categoriesList?: Category[]
}