import { Container } from '@mantine/core'
import styles from './styles/payments.module.css'
import TableAndSelector from './components/TableAndSelector';
import dayjs from 'dayjs';
import { connection } from 'next/server';
import { fetchMonthlyPaymentsStats, fetchPaymentsGeneral } from '@/app/requests/payments';
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert';
import { PaymentsMonthStats, paymentsResponse } from '@/interfaces/payments';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async ({searchParams}:{searchParams:Promise<{date:string}>}) => {

    await connection()
    let currentDate = dayjs().format('YYYY-MM-DD')

    const handleDateChange = async (newDate: string) => {
        return await Promise.allSettled([
            fetchPaymentsGeneral(newDate),
            fetchMonthlyPaymentsStats(newDate),
        ])
    }
    
    const { date } = await searchParams

    const currentData = await handleDateChange(date ?? currentDate)
    if(currentData.some(d => d.status !== 'fulfilled' || !d.value.success)) {
        return (
        <Container fluid className={styles.containerStyles}>
            <ErrorAlert errorMessage={'error_fetching_data'}/>
        </Container>
        )
    }

    const  genData = currentData[0].status === 'fulfilled' ? currentData[0].value.data as paymentsResponse[] : []
    const  stats = currentData[1].status === 'fulfilled' ? currentData[1].value.data as PaymentsMonthStats[]  : []

    return (
        <Container fluid className={styles.containerStyles}>
            <TableAndSelector
                date={date ?? currentDate}
                fetchedPayments= {genData}
                fetchedStats= {stats}
            />
        </Container>
    )
}

export default page