import { ExpenseDetail, ExpenseType, ScheduleExpense } from "@/interfaces/expenses";
import { StandardResponsePromise } from "@/interfaces/requests";


export const fetchExpensesTypes = async (): StandardResponsePromise<ExpenseType[]> => {
    try {
        const cookies = document.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/expenseTypes", {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const result = await response.json();
        if(!result.success)  throw new Error(result.error)

        const expenseTypeData = result?.data ?? []
        return {
            success: true,
            data: expenseTypeData,
            error: null,
        };
    } catch(e) {
        console.log(e)
        return {
            success: false,
            error: e,
            data: []
        }
    }
}
export const fetchScheduleExpenses = async (): StandardResponsePromise<ScheduleExpense[]> => {
    try {
        const cookies = document.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/scheduleExpenses", {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const result = await response.json();
        if(!result.success)  throw new Error(result.error)

        const expenseTypeData = result?.data ?? []
        return {
            success: true,
            data: expenseTypeData,
            error: null,
        };
    } catch(e) {
        console.log(e)
        return {
            success: false,
            error: e,
            data: []
        }
    }
}
export const fetchExpenseById = async (expense_uid: string): StandardResponsePromise<ExpenseDetail> => {
    try {
        if(!expense_uid) throw new Error('expense_uid is required')
        const cookies = document.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/expenses/" + expense_uid, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })

        const result = await response.json();
        if(!result.success)  throw new Error(result.error)

        const expenseTypeData = result?.data ?? []
        return {
            success: true,
            data: expenseTypeData,
            error: null,
        };
    } catch(e) {
        console.log(e)
        return {
            success: false,
            error: e,
            data: null
        }
    }
}

export const postExpensesForm = async (formValues: any) => {
    console.log(formValues)
    try {
        const cookies = document.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/expenses/new-expense", {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
            body: JSON.stringify({...formValues}),
        })

        const result = await response.json();
        if(!result.success) throw new Error(result.error)

        return {
            success: true,
            data: null,
            error: null,
        };

    } catch(e) {
        return {
            success: false,
            data: null,
            error: e,
        };
    }
}