export interface StandardResponseData<T> {
    data: T | null
    message?: string
    success: boolean
    error?: any
}

export type StandardResponsePromise<T> = Promise<StandardResponseData<T>>
