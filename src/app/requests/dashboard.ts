import { HomeData } from "@/interfaces/home";
import { StandardResponsePromise } from "@/interfaces/requests";
import { cookies } from "next/headers";

export const fetchHomeDashboard = async (requestedDate : string): StandardResponsePromise<HomeData> => {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get('authToken')
        const response = await fetch(process.env.BASE_URL + '/api/' + 'home?date=' + requestedDate, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.value}`,
            },
        })
        const result = await response.json();

        if(result.isSuccess === false) throw new Error(result.code)
        return result
    } catch(e) {
        return {
            success: false,
            error: e,
            data: null
        }
    }
}
