import { Event } from '@/interfaces/events'
import { Card, Group, lighten, Stack, Text } from '@mantine/core'
import dayjs from '@/helpers/dayjs'
import styles from '../styles/events.module.css'
import { stringToHexColor } from '@/app/utils/colorRandomizer'
import EventStatus from '@/app/components/InformationDisplay/EventStatus'

const EventsListCard = ({event, hoverAction }:{event: Event, hoverAction: any}) => {

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
        <Card shadow="xs" padding="lg" radius="md" withBorder key={event.event_uid}  className={styles.card}
            style={{ '--gradient': stringToHexColor(event.type_name) } as React.CSSProperties}
            onMouseEnter={(props)=>hoverAction(props, event.date_start)} onMouseLeave={(props)=>hoverAction(props, null)}
        >
            <Group justify="space-between" className={styles.card_body}>
                <Stack gap={1}>
                    <Text size='xl' fw={600} c={lighten(stringToHexColor(event.type_name), .1)}>{dayjs(event.date_start).format('DD')}</Text>
                    <Text size='sm' >{dayjs(event.date_start).format('ddd')}</Text>
                </Stack>
                <Stack gap={1} className={styles.card_firt}>
                    <Group>
                        <Text>{event.event_name}</Text>
                        <EventStatus event_state={event.event_state}/>
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