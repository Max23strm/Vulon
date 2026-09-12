import { StandardResponsePromise } from "@/interfaces/requests";
import { TeamRes } from "@/interfaces/teams";
import { cookies } from "next/headers";

export const getAllTeamsByEntity = async (entity_uid : string): StandardResponsePromise<TeamRes[]> => {

    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')
    try {
        if(!entity_uid) throw new Error('Entity is required')
        const teamsResponse = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + `teams?entity_uid=${entity_uid}`, {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, ),
        );
        
        const teamRes = (await teamsResponse.json())
        if(!teamRes.success)  throw new Error(teamRes.error)

        const teams = teamRes?.data ?? []

        return {
            success: true,
            data: teams,
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