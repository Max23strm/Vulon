import EventType from '@/app/components/InformationDisplay/EventType'
import { Event, GoogleEvent } from '@/interfaces/events'
import { ActionIcon, Card, Group, Stack, Text } from '@mantine/core'
import { ChevronRight } from '@mynaui/icons-react'
import dayjs from '@/helpers/dayjs'
import Link from 'next/link'
import styles from '../styles/events.module.css'

const EventsListCard = ({event }:{event: Event}) => {

    const defineIfFullDay = (e : Event) => {
        if(dayjs(e.date_start).get('hour') === 0 && dayjs(e.date_start).add(1,'day').isSame(dayjs(e.date_end))) {
            return {start: dayjs(event.date_start).format('DD/MM/YY'), end: null}
        } 
        return {
            start: dayjs(e.date_start).get('hour') === 0 ? dayjs(event.date_start).format('DD/MM/YY') : dayjs(event.date_start).format('DD/MM/YY hh:mm'),
            end: dayjs(e.date_end).get('hour') === 0 ? dayjs(event.date_end).format('DD/MM/YY') : dayjs(event.date_end).format('DD/MM/YY hh:mm')
        }
    }

    return (
        <Card shadow="xs" padding="lg" radius="md" withBorder key={event.event_uid} >
            <Group justify="space-between" className={styles.card_body}>
                <Stack gap={1} className={styles.card_firt}>
                    <Group>
                        <Text>{event.event_name}</Text>
                        <EventType event={event.type_name}/>
                    </Group>
                    <Group gap={'xs'}>
                        <Text size="sm" c="dimmed" fw={500}>
                            {defineIfFullDay(event).start}
                        </Text> 
                        {
                            defineIfFullDay(event)?.end ? 
                            <>
                                {/* <Text size="sm" c="dimmed">-</Text> */}
                                <Text size="sm" c="dimmed"  fw={500}>{defineIfFullDay(event)?.end}</Text>
                            </> : null
                        
                        }
                    </Group>
                    {/* {
                        event.location.length ?
                            <Group>
                                <Text size="xs" c="dimmed">{event.location}</Text>
                            </Group> :
                        null
                    } */}
                </Stack>
                {/* <ActionIcon
                    variant="subtle" 
                    size='compact-sm'
                >
                    <ChevronRight />
                </ActionIcon > */}
            </Group>
        </Card>
    )
}

export default EventsListCard