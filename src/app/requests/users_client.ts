import { userGeneral } from "@/interfaces/fetchers"
import { StandardResponsePromise } from "@/interfaces/requests"

export const fetchUsers = async (): StandardResponsePromise<userGeneral[]> => {
    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
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