type ApiResponseParams<T> = {
    message: string;
    status: boolean;
    dataKey: string;
    data: T;
 };
 
 class ApiError<T> extends Error {
    status: boolean;
    [key: string]: any;
 
    constructor (params: ApiResponseParams<T>) {
       super(params.message || 'Something Went Wrong...');
       this.name = 'ApiError';
       this.status = params.status || false;
       this[params.dataKey] = params.data || {};
 
       // Maintain proper stack trace (only available on V8)
       if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ApiError);
       }
    }
 }
 
 export default ApiError;
 