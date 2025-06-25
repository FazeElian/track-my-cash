export type SearchBarType = {
    titleModule: string
    searchName: string
    placeholder: string
    filter: string
    module: string
    setFilter: (filter : string) => void
    onSearchSubmit: (query: string) => void
}