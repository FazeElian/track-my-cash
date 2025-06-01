export type Category = {
    id: number
    name: string
    type: string
    icon: string
    color: string
    monthlyBudget: number
}

export type AddCategory = Pick<Category,
    "name" |
    "type" |
    "icon" |
    "color" |
    "monthlyBudget"
>;