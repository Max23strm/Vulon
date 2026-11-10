'use client'
import { Event } from '@/interfaces/events';
import { Alert, Card, Container, Divider, Grid, GridCol, Skeleton, Stack, Text } from '@mantine/core';
import MainCalendar from './MainCalendar';
import dayjs from 'dayjs';
import { MouseEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import EventsListCard from './EventsListCard';
import styles from '../styles/events.module.css'
import { DangerOctagon } from '@mynaui/icons-react';
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
    const hoverRef = useRef('')
    const [hovered, setHovered] = useState('')
    const handleHover = (props: MouseEvent<HTMLDivElement, MouseEvent>, date: string) => {
        setHovered (props.type === 'mouseenter' ? date : '')
    }
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

    const displayableEvents =  events.reduce((final: { date: string; ev: Event[]; }[], event)=>{
        const date = dayjs(event.date_start).format('DDMMYYYY')
        const existingIndex = final.findIndex( obj => obj.date === date)

        if(existingIndex > -1) {
            final[existingIndex].ev.push(event)
        } else {
            final.push({
                date: date,
                ev: [event]
            })

        }

        return final
    },[])
    
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
                                    hoverRef={hovered}
                                />
                            </Card>
                        </GridCol>
                }
                <GridCol span={{base:12, md:7}} className={styles.card_column}>
                    {
                        
                        !events?.length ?
                            <Alert variant="light" color="entitySecondary" title={tAlerts('no_events_planned')} withCloseButton={false} icon={<DangerOctagon/>}/> :
                            displayableEvents.map((d,i )=> (
                                <Stack gap={5} key={d.date}>
                                    <Divider my="xs" label={`${dayjs(d.date).format('dddd DD')}`} labelPosition="left" />
                                    {d.ev.map( (e : Event) => ( <EventsListCard event={e} key={e.event_uid} hoverAction={handleHover}/> ))}
                                </Stack>
                            ))
                    }
                </GridCol>
                { 
                    matches &&
                        <GridCol span={{base:5}} className={styles.calendar_section}>
                            <Card shadow="xs" padding="lg" radius="md" withBorder className={styles.calendar_card}>
                                <MainCalendar 
                                    events={events}
                                    monthChange= {changeDate}
                                    hoverRef={hovered}
                                />
                            </Card>
                        </GridCol>
                }
            </Grid>
        </Container>
    )
}


export default MainComponent