export type Goal = {
    id: number
    title: string
    description: string
    currentAmount: number
    targetAmount: number
    deadline: string
    category: string
    priorityLevel: string
    color: string
    state: string
    editForm: (id: number) => void
}

export type GoalForm = Pick<Goal,
    "title" |
    "description" |
    "targetAmount" |
    "deadline" |
    "priorityLevel" |
    "category" |
    "color"
>