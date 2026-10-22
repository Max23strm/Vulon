import { PaymentsTypesPageProps } from "@/interfaces/fetchers";
import { paymentTypesResponse } from "@/interfaces/payments";
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