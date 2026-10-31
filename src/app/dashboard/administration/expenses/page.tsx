import { Container } from '@mantine/core'
import FullPage from './components/FullPage'
import dayjs from 'dayjs';
import { connection } from 'next/server';
import { fetchMonthlyPaymentsStats, fetchPaymentsGeneral } from '@/app/requests/payments';
import { PaymentsMonthStats, paymentsResponse } from '@/interfaces/payments';
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert';
import { fetchMonthlyExpenses } from '@/app/requests/expenses';
import { SimpleExpense } from '@/interfaces/expenses';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async ({searchParams}:{searchParams: Promise<{date: string}>}) => {
   await connection()
    let currentDate = dayjs().format('YYYY-MM-DD')

    const handleDateChange = async (newDate: string) => {
        return await Promise.allSettled([
            fetchMonthlyExpenses(newDate),
            // fetchMonthlyPaymentsStats(newDate),
        ])
    }
    
    const { date } = await searchParams

    const currentData = await handleDateChange(date ?? currentDate)
    if(currentData.some(d => d.status !== 'fulfilled' || !d.value.success)) {
        return (
            <Container fluid >  
                <ErrorAlert errorMessage={'error_fetching_data'}/>
            </Container>
        )
    }

    const  expList = currentData[0].status === 'fulfilled' ? currentData[0].value.data as SimpleExpense[] : []

    return (
        <Container fluid>
            <FullPage date={date ?? currentDate} expList={expList}/>
        </Container>
    )
}

export default page