export type TableProps = {
    headers: Array<string>,
    data: Array<any>,
    itemsPerPage: number,
    resetPagination?: number,
    actionButtons?: 'none' | 'delete' | 'participants' | 'both';
    keys: Array<string>,
    deleteItem?: (id: number) => void,
}