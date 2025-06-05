import type { TextareaHTMLAttributes } from "react";

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    labelFor: string;
}