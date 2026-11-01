import { AllExpensesResponse, ExpensesInfo, SimpleExpense } from "@/interfaces/expenses"
import { StandardResponsePromise } from "@/interfaces/requests"
import { cookies } from "next/headers"

export const fetchMonthlyExpenses = async (requestedDate: string): StandardResponsePromise<SimpleExpense[]> => {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get('authToken')
        if(!requestedDate) throw new Error('Date is required')
        const response = await fetch(process.env.BASE_URL + "/api/expenses?date=" + requestedDate, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.value}`,
            },
        })
        const result = await response.json();
        if(!result.success)  throw new Error(result.error)

        const paymentStatsData = result?.data ?? []
        return {
            success: true,
            data: paymentStatsData,
            error: null,
        };
    } catch(e) {
        return {
            success: false,
            error: e,
            data: []
        }
    }
}
export const fetchExpensesInfo = async (requestedDate: string): StandardResponsePromise<ExpensesInfo> => {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get('authToken')
        if(!requestedDate) throw new Error('Date is required')
        const response = await fetch(process.env.BASE_URL + "/api/expenses/summary?date=" + requestedDate, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.value}`,
            },
        })
        const result = await response.json();
        if(!result.success)  throw new Error(result.error)

        const paymentsHeaderInfo = result?.data ?? []
        return {
            success: true,
            data: paymentsHeaderInfo,
            error: null,
        };
    } catch(e) {
        return {
            success: false,
            error: e,
            data: null
        }
    }
}