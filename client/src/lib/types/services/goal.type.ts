export type Goal = {
    id: number
    title: string
    description: string
    amount: number
    deadline: string
    category: string
    color: string
    state: string
    editForm: (id: number) => void
}

export type GoalForm = Pick<Goal,
    "title" |
    "description" |
    "amount" |
    "deadline" |
    "category" |
    "color"
>