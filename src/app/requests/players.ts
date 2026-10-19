import { PlayerDetailPageProps } from "@/interfaces/fetchers";
import { playersData, playersStatsData } from "@/interfaces/players";
import { StandardResponsePromise } from "@/interfaces/requests";
import { cookies } from "next/headers";

export const getAllPlayers = async (entity_uid?: string): StandardResponsePromise<playersData[]> => {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')
    try {
        if(!entity_uid) throw new Error('Entity is required')
        const playersResponse = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + "players/" + entity_uid, {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, ),
        );

        const playersRes = (await playersResponse.json())
        if(!playersRes.success)  throw new Error(playersRes.error)

        const players = playersRes?.data ?? []
        return {
            success: true,
            data: players,
            error: null,
        };
    

    } catch (err) {
        return {
            success: false,
            error: `${err}`,
            data: null,
        };
    }
};
export const getAllPlayersStats = async (entity_uid?: string): StandardResponsePromise<playersStatsData> => {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')
    try {
        if(!entity_uid) throw new Error('Entity is required')
        const playersResponse = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + "playersStats/" + entity_uid, {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, ),
        );
        const playersRes = await playersResponse.json()
        if(!playersRes.success)  throw new Error(playersRes.error)

        const playersStat = playersRes?.data ?? []
        return {
            success: true,
            data: playersStat,
            error: null,
        };
    

    } catch (err) {
        return {
            success: false,
            error: `${err}`,
            data: null,
        };
    }
};