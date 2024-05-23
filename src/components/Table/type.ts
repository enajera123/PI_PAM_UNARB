export type TableProps = {
    headers: Array<string>,
    data: Array<any>,
    itemsPerPage: number,
    resetPagination?: number,
    actionColumn?: 'none' | 'delete' | 'delete-participants' | 'delete-state';
    keys: Array<string>,
    deleteRowFunction?: (id: number) => void
    desactivateRowFunction?: (id: number) => void
    doubleClickRowFunction?: (id: number) => void
}