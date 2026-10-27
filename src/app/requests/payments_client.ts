import { PaymentDetailResponse } from "@/interfaces/fetchers";
import { PaymentCat, PaymentDetails, PaymentsMonthStats, paymentsResponse, paymentTypesResponse } from "@/interfaces/payments";
import { StandardResponsePromise } from "@/interfaces/requests";

export const paymentTypesFetch_client = async (entity_uid: string): StandardResponsePromise<paymentTypesResponse[]> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        if(!entity_uid) throw new Error('Enitity is required')
        const paymentRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "paymentsTypes/" + entity_uid, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const patmentResObj = (await paymentRes.json())
        if(!patmentResObj.success)  throw new Error(patmentResObj.error)

        const payments = patmentResObj?.data ?? []

        return {
            success: true,
            data: payments,
            error: null,
        };


    } catch (e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

};

export const paymentsGeneralFetch = async (requestedDate : string ): StandardResponsePromise<paymentsResponse[]> => {
    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        if(!requestedDate) throw new Error('Date is required')
        const paymentRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/payments?date=" + requestedDate, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const patmentResObj = (await paymentRes.json())

        if(!patmentResObj.success)  throw new Error(patmentResObj.error)

        const payments = patmentResObj?.data ?? []
        return {
            success: true,
            data: payments,
            error: null,
        };
    

    } catch (err) {
        return{
            success: false,
            data: null,
            error: err,
        }
    }
};

export const monthlyPaymentsStats = async (date: string): StandardResponsePromise<PaymentsMonthStats[]> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        if(!date) throw new Error('Date is required')
        const paymentRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/payments/stats?date=" + date, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const patmentResObj = (await paymentRes.json())

        if(!patmentResObj.success)  throw new Error(patmentResObj.error)

        const payments = patmentResObj?.data ?? []
        return {
            success: true,
            data: payments,
            error: null,
        };


    } catch (e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

};

export const paymentsDetailFetch = async (requestedPayment : string ): StandardResponsePromise<PaymentDetails> => {
    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        if(!requestedPayment) throw new Error('Payment_uid is required')
        const payment_response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/payments/paymentById/" + requestedPayment, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        }, )
        const response = (await payment_response.json())

        return {
            data: response.data,
            success: true,
            error : null,
        };
    

    } catch (err) {
        return {
            data: null,
            success: false,
            error: `${err}`,
        };
    }
};


export const paymentTypesCatFetch_client = async (entity_uid: string): StandardResponsePromise<PaymentCat[]> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        if(!entity_uid) throw new Error('Enitity is required')
        const paymentRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "paymentsCategory/" + entity_uid, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const patmentResObj = (await paymentRes.json())
        if(!patmentResObj.success)  throw new Error(patmentResObj.error)

        const payments = patmentResObj?.data ?? []

        return {
            success: true,
            data: payments,
            error: null,
        };


    } catch (e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

};
export const postPaymentTypesCat_client = async (paymentTypeForm: {
    entity_uid: string;
    description: string;
    amount: number;
    active: boolean;
    paymetType: string;
}): StandardResponsePromise<PaymentCat[]> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const paymentRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "paymentsCategory", {
            method:'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify({...paymentTypeForm}),
        })

        const patmentResObj = (await paymentRes.json())
        if(!patmentResObj.success)  throw new Error(patmentResObj.error)

        const payments = patmentResObj?.data ?? []

        return {
            success: true,
            data: payments,
            error: null,
        };


    } catch (e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

};

export const postPaymentForm_client = async (formValues: {
    player_uid: string;
    amount: number;
    reference: string;
    date: Date;
    payment_type_uid: string;
    comment: string;
}): StandardResponsePromise<string> => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {

        if(formValues.player_uid.length === 0 || formValues.amount <= 0 ) {
            throw new Error('Validate form')
        }

        const paymentRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "payments/new-payment", {
            method:'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify({...formValues}),
        })

        const patmentResObj = (await paymentRes.json())
        if(!patmentResObj.success)  throw new Error(patmentResObj.error)

        const payments = patmentResObj?.data ?? []

        return {
            success: true,
            data: payments,
            error: null,
        };


    } catch (e) {
        return {
            data:null,
            success: false,
            error: e
        }
    }

};