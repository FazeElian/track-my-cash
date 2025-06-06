export type Transaction = {
    id: number
    title: string
    amount: number
    type: string
    categoryId: number
    date: string
    state: string
    notes: string
    editForm: (id: number) => void
}

export type TransactionForm = Pick<Transaction,
    "id" |
    "title" |
    "amount" |
    "type" |
    "categoryId" |
    "date" | 
    "state" | 
    "notes"
>;