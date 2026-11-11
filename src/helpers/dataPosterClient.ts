import { PaymentReport } from "@/interfaces/reports";
import dayjs from "@/helpers/dayjs";

export const postPaymentsResponse = async ( formValues: PaymentReport ) : Promise<{ isSuccess: boolean, estado?:string, error?:unknown, player_uid?: string } | void>  => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "payments/getPaymentsReport", {
            method: 'POST',
            cache:'no-store', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify(formValues),
        })
        
        const status = response.status
        if(status === 200) {
            const result = await response.blob();
    
            const fileName= `Ingresos ${dayjs(formValues.start_date).format('DD-MM-YY')} - ${dayjs(formValues.end_date).format('DD-MM-YY')}.${formValues.file_type === 'excel' ? 'xlsx' : 'pdf'}`
    
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
    
            const url = window.URL.createObjectURL(result);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            const result = await response.json();

            return result
        }



    } catch(e) {
        return {
            isSuccess: false,
            error: e
        }
    }

}

export const postExpensesResport = async ( formValues: PaymentReport ) : Promise<{ isSuccess: boolean, estado?:string, error?:unknown, player_uid?: string } | void>  => {

    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "expenses/getExpensesReport", {
            method: 'POST',
            cache:'no-store', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify(formValues),
        })
        
        const status = response.status
        if(status === 200) {
            const result = await response.blob();
    
            const fileName= `Gastos ${dayjs(formValues.start_date).format('DD-MM-YY')} - ${dayjs(formValues.end_date).format('DD-MM-YY')}.${formValues.file_type === 'excel' ? 'xlsx' : 'pdf'}`
    
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
    
            const url = window.URL.createObjectURL(result);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            const result = await response.json();

            return result
        }



    } catch(e) {
        return {
            isSuccess: false,
            error: e
        }
    }

}
