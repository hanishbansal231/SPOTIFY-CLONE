type ApiResponseParams<T> = {
    message: string;
    status: boolean;
    dataKey: string;
    data: T;
 };
 
 class ApiResponse<T> {
    message: string;
    status: boolean;
 
    constructor(params: ApiResponseParams<T>) {
       this.message = params.message;
       this.status = params.status;
       (this as any)[params.dataKey] = params.data;
    }
 }
 
 export default ApiResponse;
 