"use server"

import { playerTypeFormWithStatusAsString } from "@/interfaces/players";
import { cookies } from "next/headers";

type payments = {
    player_uid: string;
    amount: number;
    reference: string;
    date: Date;
    payment_type_uid: string;
    comment: string;
}
type expenses = {
    assigned_uid: string;
    amount: number;
    date: Date;
    reason: string;
}

export const postExpensesForm = async (formValues: expenses) => {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value ?? ''

    const base64Url = authToken?.split('.')[1]
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/') ?? '';
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload)
    const user_uid = payload.sub

    try {
        const response = await fetch(process.env.BASE_URL + '/api/' + "expenses/new-expense", {
            method: 'POST',
            cache:'no-store', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({...formValues, registered_by: user_uid}),
        })
        const result = await response.json();
        return result

    } catch(e) {
        return {
            isSuccess: false,
            error: e
        }
    }
}


export const postPaymentForm = async ( formValues: payments ) => {

    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value ?? ''

    const base64Url = authToken?.split('.')[1]
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/') ?? '';
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload)
    const user_uid = payload.sub

    try {
        const response = await fetch(process.env.BASE_URL + '/api/' + "payments/new-payment", {
            method: 'POST',
            cache:'no-store', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({...formValues, user_uid}),
        })
        const result = await response.json();
        return result

    } catch(e) {
        return {
            isSuccess: false,
            error: e
        }
    }

}
export const postPlayerForm = async ( formValues: playerTypeFormWithStatusAsString ) : Promise<{ isSuccess: boolean, estado?:string, error?:unknown, player_uid?: string }>  => {
    
    try {
        const response = await fetch(process.env.BASE_URL + '/api/' + "players/newPlayer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
        const result = await response.json();
        return result
    } catch(e) {
        return {
            isSuccess: false,
            error: e
        }
    }

}