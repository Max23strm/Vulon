import { Event, GoogleEvent, GoogleEventsResponse } from "@/interfaces/events";
import { StandardResponsePromise } from "@/interfaces/requests";
import { EntityAssigned } from "@/interfaces/requests/entities";
import { cookies } from "next/headers";



export const eventsGeneralFetch =  async (date : string, entity_uid: string) : StandardResponsePromise<Event[]> => {
        
    try {
        if(!date || ! entity_uid) throw new Error("Date and entity_uid are required")

        const cookieStore = await cookies()
        const authToken = cookieStore.get('authToken')
        const events_response = await Promise.resolve(
            fetch(process.env.BASE_URL +  '/api/' + "events/getEventsByMonth?date=" + date + "&entity_uid=" + entity_uid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }),
        );
        const eventsRes = (await events_response.json()) ;
        if(!eventsRes.success)  throw new Error(eventsRes.error)

        const eventsResponse = eventsRes?.data ?? []
        return {
            data : eventsResponse,
            error: null,
            success : true,
        };
    
    } catch (err) {
        return {
            data : [],
            error: `${err}`,
            success: false,
        };
    }

    
}