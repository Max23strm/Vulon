"use server"

import { AllExpensesResponse } from "@/interfaces/expenses";
import { ExpenseDetailResponse, PaymentDetailResponse, PaymentsPageProps, PaymentsTypesPageProps, PlayerDetailPageProps, PlayersPageProps, UserResponse, UsersGeneralResponse } from "@/interfaces/fetchers";
import { Fetch, HomeResponse } from "@/interfaces/home";
import { paymentsResponse, paymentTypesResponse } from "@/interfaces/payments";
import { playersData, playersDetailResponse, playersResponse } from "@/interfaces/players";
import { cookies } from 'next/headers'

export const homeFetch = async (requestedDate : string ): Promise<HomeResponse> => {
    let data: Fetch = {} as Fetch
    const errors = { home: null as string | null };

    try {
        const events_response = await fetch(process.env.BASE_URL + '/api/home?date=' + requestedDate, { cache: 'no-store' });
        data = (await events_response.json()) as Fetch;
    } catch (err) {
        errors.home = `${err}`;
        return {
            data:data.data,
            isSuccess: data?.isSuccess ?? false,  // safe access if data is undefined
            errors,
        };
    }

    return {
        data:data.data,
        isSuccess: data.isSuccess,
        errors,
    };
};



export const playersGeneralFetch = async (): Promise<PlayersPageProps> => {
    let players: playersData[] = [];
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')
    try {
        const playersResponse = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + "players", {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, ),
        );
        
        const playersRes = (await playersResponse.json()) as playersResponse;
        if(!playersRes.isSuccess) {
            return {
                isSuccess: false,
                errors: playersRes.mensaje,
                players: []
            }
        }
        players = playersRes?.data ?? []
        return {
            isSuccess: true,
            players,
            errors: null,
        };
    

    } catch (err) {
        return {
            isSuccess: false,
            errors: `${err}`,
            players,
        };
    }
};
export const usersGeneralFetch = async (): Promise<UsersGeneralResponse> => {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')

    try {
        const usersReq = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + "users/", {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, ),
        );
        const userRes = await usersReq.json();

        if(!userRes.isSuccess) {
            return {
                isSuccess: false,
                mensaje: userRes.mensaje,
                data: []
            }
        }
        return {
            data: userRes?.data,
            isSuccess: userRes.isSuccess,
            mensaje: null,
        };
    

    } catch (err) {
        return {
            isSuccess: false,
            mensaje: `${err}`,
            data: [],
        };
    }
};

export const expensesGeneralFetch = async (requestedDate : string ): Promise<AllExpensesResponse> => {

    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')
       

    try {
        const events_response = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + "expenses?date=" + requestedDate, {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, ),
        );
        const response = (await events_response.json()) as AllExpensesResponse;
        
        if(!response.isSuccess) {
            return {
                data: [],
                isSuccess: false,
                mensaje : response.mensaje
            };
        }


        return {
            data: response.data,
            isSuccess: response.isSuccess,
            estado: response.estado,
        };
    

    } catch (err) {
        return {
            data: [],
            isSuccess: false,
            mensaje : `${err}`
        };
    }
};

export const paymentTypesFetch = async (): Promise<PaymentsTypesPageProps> => {
    let paymentTypes: paymentTypesResponse[] = [];

    try {
        const events_response = await Promise.resolve(fetch(process.env.BASE_URL + '/api/' + "paymentsTypes"));

        paymentTypes = (await events_response.json()) as paymentTypesResponse[];

        return {
            isSuccess: true,
            paymentTypes,
            errors : null,
        };
    

    } catch (err) {
        return {
            paymentTypes,
            errors: `${err}`,
            isSuccess: false
        };
    }
};

export const paymentsGeneralFetch = async (requestedDate : string ): Promise<PaymentsPageProps> => {
    let payments: paymentsResponse[] = [];
    const errors = { payments: null as string | null };

    try {
        const events_response = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + "payments?date=" + requestedDate, {cache:'no-store'}),
        );
        payments = (await events_response.json()) as paymentsResponse[];
        
        return {
            payments,
            errors,
        };
    

    } catch (err) {
        errors.payments = `${err}` ;
        return {
            payments,
            errors,
        };
    }
};

export const playersDetailFetch = async (requestedPlayer : string ): Promise<PlayerDetailPageProps> => {
    let player: playersDetailResponse | null = null;
    const errors = { player: null as string | null };

    try {
        const player_response = await Promise.resolve(
            fetch(process.env.BASE_URL + "/api/players/" + requestedPlayer,),
        );
        player = (await player_response.json()) as playersDetailResponse;
        player.status = `${player.status}`
        return {
            player,
            errors,
        };
    

    } catch (err) {
        errors.player = `${err}` ;
        return {
            player,
            errors,
        };
    }
};

export const getUser =  async () : Promise<UserResponse> => {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')?.value ?? ''

    const base64Url = authToken?.split('.')[1]
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/') ?? '';
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
    const payload = JSON.parse(jsonPayload)
    const user_uid = payload.sub

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "users/" +  user_uid, {
            cache:'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        }, )

        const result = await response.json();

        if(!result.isSuccess){
            return {
                isSuccess: false,
                error: 'Error',
                data:null
            }
        }

        return  {
            isSuccess: result,
            data:result.data
        }

    } catch(e) {
        return {
            isSuccess: false,
            error: `${e}`,
        }
    }
}
export const paymentsDetailFetch = async (requestedPayment : string ): Promise<PaymentDetailResponse> => {
    const errors = { player: null as string | null };
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')


    try {
        const payment_response = await Promise.resolve(
            fetch(process.env.BASE_URL + "/api/payments/paymentById/" + requestedPayment, {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, )
        );
        const response = (await payment_response.json())

        return {
            payment: response.data,
            isSucces: response.isSuccess,
            errors : null,
        };
    

    } catch (err) {
        errors.player = `${err}` ;
        return {
            payment: null,
            isSucces: false,
            errors: `${err}`,
        };
    }
};
export const expenseDetailFetch = async (requestedExpense : string ): Promise<ExpenseDetailResponse> => {
    const errors = { player: null as string | null };
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')


    try {
        const payment_response = await Promise.resolve(
            fetch(process.env.BASE_URL + "/api/expenses/" + requestedExpense, {
                cache:'no-store', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken?.value}`,
                },
            }, )
        );
        const response = (await payment_response.json())

        return {
            expense: response.data,
            isSucces: response.isSuccess,
            errors : null,
        };
    

    } catch (err) {
        errors.player = `${err}` ;
        return {
            expense: null,
            isSucces: false,
            errors: `${err}`,
        };
    }
};
