import { PlayerDetailPageProps } from "@/interfaces/fetchers";
import { playersData, playersDetailResponse, playerTypeFormWithStatusAsString, putPlayersOptions } from "@/interfaces/players";
import { StandardResponsePromise } from "@/interfaces/requests";

export const getPlayersClient = async (entity_uid: string): StandardResponsePromise<playersData[]> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        if(!entity_uid) throw new Error('Enitity is required')
        const playersResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "players/" + entity_uid, {
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

export const playersDetailFetch = async (requestedPlayer : string ): StandardResponsePromise<playersDetailResponse> => {
    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))
    try {
        if(!requestedPlayer) throw new Error('Player is required')
        const playersResponse = await Promise.resolve(
            fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "playerById/" + requestedPlayer, {
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.split('=')[1]}`,
                },
            }, ),
        );
        const playerDetail = (await playersResponse.json())
        if(!playerDetail.success)  throw new Error(playerDetail.error)

        return {
            success: true,
            data: playerDetail.data,
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

export const putPlayerForm = async ( value: putPlayersOptions ) : StandardResponsePromise<{  estado?:string,  player_uid?: string }>  => {
    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const response = await Promise.resolve(
            fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "players/editPlayer/" + value.player_uid, {
                method: 'PUT',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.split('=')[1]}`,
                },
                body: JSON.stringify(value),
            }, ),
        );
        
        const result = await response.json();
        
        return {
            data: {estado :result.data.estado, player_uid: result.data.player_uid},
            error: null,
            success: true
        }
    } catch(e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

}

export const postPlayerForm = async ( formValues: playerTypeFormWithStatusAsString ) : StandardResponsePromise<{ player_uid?: string }>  => {
    
    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL +  '/api/' + "players/newPlayer", {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify(formValues),
        })
        const result = await response.json();
        if(!result.success) throw new Error(result?.message ?? result.error)
            
        return {
            data: result.player_uid,
            success: true,
            error: null
        }
    } catch(e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

}