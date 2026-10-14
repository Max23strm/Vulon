import { playersData } from "@/interfaces/players";
import { StandardResponsePromise } from "@/interfaces/requests";

export const getPlayersClient = async (): StandardResponsePromise<playersData[]> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const playersResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "players", {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const playersRes = (await playersResponse.json())
        if(!playersRes.success)  throw new Error(playersRes.error)

        const players = playersRes?.data ?? []

        return {
            success: true,
            data: players,
            error: null,
        };


    } catch (e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

}