
import MainComponent from './components/MainComponent';
import { Container } from '@mantine/core';
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert';
import { Event, GoogleEvent } from '@/interfaces/events';
import dayjs from '@/helpers/dayjs';
import { connection } from 'next/server';
import { eventsClosestFetch, eventsGeneralFetch } from '@/app/requests/events';
import { getSession } from '@/app/services/cookies/serverSideStoring';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async ({searchParams}:{searchParams:Promise<{date:string}>}) => {

    await connection()
    let currentDate = dayjs().format('YYYY-MM-DD')
    const { entity_uid } = await getSession();
    
    const handleDateChange = async (newDate: string) => {
        return await Promise.allSettled([
            eventsGeneralFetch(newDate, entity_uid ?? ''),
            eventsClosestFetch(currentDate, entity_uid ?? ''),
        ])
    }
    
    const { date } = await searchParams
    const currentData = await handleDateChange(date ?? currentDate)

    if(currentData.some(d => d.status !== 'fulfilled' || !d.value.success)) {
        return (
            <Container fluid>
                <ErrorAlert errorMessage={'error_fetching_data'}/>
            </Container>
        )
    }

    const  eventData = currentData[0].status === 'fulfilled' ? currentData[0].value.data as Event[] : []
    const  nextEventData = currentData[1].status === 'fulfilled' ? currentData[1].value.data as Event : null
    


    return (
        <MainComponent 
            events={eventData.sort((a, b) => dayjs(a.date_start).diff(dayjs(b.date_start)))}
            nextEvent={nextEventData}
        />
    )
}

export default page
