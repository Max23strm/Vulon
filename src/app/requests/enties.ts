import { StandardResponsePromise } from "@/interfaces/requests";
import { EntityAssigned } from "@/interfaces/requests/entities";
import { cookies } from "next/headers";

export const fetchEntitiesAssigned = async (): StandardResponsePromise<EntityAssigned[]> => {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get('authToken')
        const response = await fetch(process.env.BASE_URL + '/api/' + "entitiesByUser", {
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
            data: []
        }
    }
}