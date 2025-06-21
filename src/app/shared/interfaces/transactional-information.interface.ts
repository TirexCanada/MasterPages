export interface ITransactionalInformation {
    id: number,
    isAuthenicated: Boolean,
    returnStatus: Boolean,
    returnMessage: string[],
    validationErrors: any[],
    totalPages: number,
    offset: number,
    pageSize: number,
    sortExpression: string,
    sortDirection: string,
    totalRows: number
}