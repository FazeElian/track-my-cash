export type Color = {
    id: number;
    value: string;
    colorCode: string;
}

export interface ColorsInputField {
    label: string;
    labelFor: string;
    setColor: (color: Color) => void;
    color: Color;
}