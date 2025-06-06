export type SearchBarType = {
    titleModule: string
    searchName: string
    placeholder: string
    onSearchSubmit: (query: string) => void
}