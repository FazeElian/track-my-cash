export type Goal = {
    id: number
    title: string
    description: string
    amount: number
    goalId?: number | null
    deadline: string
    state: string
    editForm: (id: number) => void
}