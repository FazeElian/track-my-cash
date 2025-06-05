export type Category = {
    id: number
    name: string
    type: string
    icon: string
    color: string
    monthlyBudget: number
    editForm: (id: number) => void
}

export type CategoryForm = Pick<Category,
    "id" |
    "name" |
    "type" |
    "icon" |
    "color" |
    "monthlyBudget"
>;