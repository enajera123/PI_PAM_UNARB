export type TableProps = {
    headers: Array<string>,
    data: Array<any>,
    itemsPerPage: number,
    resetPagination?: number,
    actionButtons?: 'none' | 'delete' | 'participants' | 'all';
    keys: Array<string>,
    deleteItem?: (id: number) => void,
}