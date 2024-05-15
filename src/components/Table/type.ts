export type TableProps = {
    headers: Array<string>,
    data: Array<any>,
    itemsPerPage: number,
    resetPagination?: number,
    showEditColumn?: boolean,
    keys: Array<string>
}