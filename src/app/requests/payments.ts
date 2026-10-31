import { PaymentsMonthStats, paymentsResponse } from "@/interfaces/payments";
import { StandardResponsePromise } from "@/interfaces/requests";
import { EntityAssigned } from "@/interfaces/requests/entities";
import { cookies } from "next/headers";

export const fetchPaymentsGeneral = async (requestedDate: string): StandardResponsePromise<paymentsResponse[]> => {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get('authToken')
        if(!requestedDate) throw new Error('Date is required')
        const response = await fetch(process.env.BASE_URL + '/api/payments?date=' + requestedDate, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.value}`,
            },
        })
        const result = await response.json();
        if(!result.success)  throw new Error(result.error)

        const paymentsData = result?.data ?? []
        return {
            success: true,
            data: paymentsData,
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
export const fetchMonthlyPaymentsStats = async (date: string): StandardResponsePromise<PaymentsMonthStats[]> => {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get('authToken')
        if(!date) throw new Error('Date is required')
        const response = await fetch(process.env.BASE_URL + "/api/payments/stats?date=" + date, {
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
