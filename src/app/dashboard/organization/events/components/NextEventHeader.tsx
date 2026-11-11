import { Card, GridCol, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import styles from '../styles/events.module.css'
import dayjs from '@/helpers/dayjs'
import { Event } from '@/interfaces/events'
import EventStatus from '@/app/components/InformationDisplay/EventStatus'

const NextEventHeader = ({nextEvent}:{nextEvent: Event | null }) => {
    const t = useTranslations("Events")

    return (
        <GridCol span={{base:12}}>
            <Card className={styles.header_body}>
                <Text size='xs' fw={600} c={'entitySecondary.5'}>{t("next_event")}</Text>
                {
                    nextEvent === null ?
                        <Text size='xl'>{t("no_event_configured")}</Text> :
                        <div className={styles.next_event}>
                            <div className={styles.titles}>
                                <Text size='xl'>{dayjs(nextEvent?.date_start).format('ddd DD')} {nextEvent?.event_name}</Text>
                                <div className={styles.details}>
                                    <Text size='xs' fw={500}>{nextEvent?.type_name}</Text>
                                    <EventStatus event_state={nextEvent?.event_state}/>
                                    {/* <Text size='xs'>{'Varonil mayor'}</Text> */}
                                </div>
                            </div>
                            <div className={styles.time}>
                                <Text size='md'>{dayjs(nextEvent?.date_start).format('h:mm A')}</Text>
                            </div>
                            
                        </div>
                }
            </Card>
        </GridCol>
    )
}

export default NextEventHeader
