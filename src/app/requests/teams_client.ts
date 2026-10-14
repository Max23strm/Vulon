import { StandardResponsePromise } from "@/interfaces/requests";
import { TeamCategory } from "@/interfaces/teams";

export const postCreateTeamClient = async (entity_uid : string, description: string): StandardResponsePromise<string> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const teamsResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "teams/new", {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify({entity_uid, description}),
        })

        const teamRes = (await teamsResponse.json())
        if(!teamRes.success)  throw new Error(teamRes.error)

        const teams = teamRes?.data ?? []

        return {
            success: true,
            data: teams,
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
export const postTeamCategoryClient = async (entity_uid : string, description: string): StandardResponsePromise<string> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const categoryResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "teams-categories/new", {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify({entity_uid, description}),
        })

        const catRes = (await categoryResponse.json())
        if(!catRes.success)  throw new Error(catRes.error)

        const category = catRes?.data ?? []

        return {
            success: true,
            data: category,
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
export const getTeamCategories = async (entity_uid: string): StandardResponsePromise<TeamCategory[]> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {

        if(!entity_uid) throw new Error('Entity is required')

        const teamsResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "teams-categories?entity_uid=" + entity_uid, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const teamRes = (await teamsResponse.json())
        if(!teamRes.success)  throw new Error(teamRes.error)

        const teams = teamRes?.data ?? []

        return {
            success: true,
            data: teams,
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

export const postAssignTeamCategoryClient = async (team_uid : string, categories: string[]): StandardResponsePromise<null> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const categoryResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "teams-categories/assign", {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify({team_uid, categories}),
        })

        const catRes = (await categoryResponse.json())
        if(!catRes.success)  throw new Error(catRes.error)

        return {
            success: true,
            data: null,
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