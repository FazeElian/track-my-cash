export type Category = {
    id: number
    name: string
    type: string
    icon: string
    color: string
    description: string
    editForm: (id: number) => void
}

export type CategoryForm = Pick<Category,
    "id" |
    "name" |
    "type" |
    "icon" |
    "color" |
    "description"
>;