'use client'
import { Event, GoogleEvent, GoogleEventsResponse } from '@/interfaces/events';
import { Alert, Card, Container, Grid, GridCol, Skeleton, Stack } from '@mantine/core';
import MainCalendar from './MainCalendar';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import EventsListCard from './EventsListCard';
import styles from '../styles/events.module.css'
import { DangerOctagon } from '@mynaui/icons-react';
import { eventsGeneralFetch } from '@/helpers/dataFetcherClient';
import { useMediaQuery } from '@mantine/hooks';
import NextEventHeader from './NextEventHeader';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const MainComponent = ({events} : {events: Event[]}) => {
    const matches = useMediaQuery("(min-width: 1050px)");
    const tAlerts = useTranslations('Alerts')
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const changeDate = (newDate: string) => {
        const params = new URLSearchParams(searchParams.toString())
        
        if (newDate) {
            const date = dayjs(newDate).format('YYYY-MM-DD')
            params.set('date', date)
        } else {
            params.delete('date')
        }

        const query = params.toString()
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    }


    return (
        <Container fluid >
            <Grid>
                <NextEventHeader/>
                { 
                    !matches &&
                        <GridCol span={{base:12}}>
                            <Card shadow="xs" padding="lg" radius="md" withBorder className={styles.calendar_card}>
                                <MainCalendar 
                                    events={events}
                                    monthChange= {changeDate}
                                />
                            </Card>
                        </GridCol>
                }
                <GridCol span={{base:12, md:7}} className={styles.card_column}>
                    {
                        
                        !events?.length ?
                            <Alert variant="light" color="entitySecondary" title={tAlerts('no_events_planned')} withCloseButton={false} icon={<DangerOctagon/>}/> :
                            
                            events.map( (e : Event) => ( <EventsListCard event={e} key={e.event_uid}/> ))
                    }
                </GridCol>
                { 
                    matches &&
                        <GridCol span={{base:5}}>
                            <Card shadow="xs" padding="lg" radius="md" withBorder className={styles.calendar_card}>
                                <MainCalendar 
                                    events={events}
                                    monthChange= {changeDate}
                                />
                            </Card>
                        </GridCol>
                }
            </Grid>
        </Container>
    )
}


export default MainComponent