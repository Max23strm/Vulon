export interface StandardResponseData<T> {
    data: T
    message?: string
    success: boolean
    error?: any
}

export type StandardResponsePromise<T> = Promise<StandardResponseData<T>>