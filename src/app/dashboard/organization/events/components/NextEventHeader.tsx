import { Card, GridCol, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import styles from '../styles/events.module.css'
import dayjs from 'dayjs'

const NextEventHeader = () => {
    const t = useTranslations("Events")
    return (
        <GridCol span={{base:12}}>
            <Card className={styles.header_body}>
                <Text size='xs' fw={600} c={'entitySecondary.5'}>{t("next_event")}</Text>
                {/* <Text size='xl'>{t("no_event_configured")}</Text> */}
                <div className={styles.next_event}>
                    <div className={styles.titles}>
                        <Text size='xl'>{dayjs().format('ddd DD')} Torneo 7s</Text>
                        <div className={styles.details}>
                            <Text size='xs' fw={500}>{'Toro Valenzuela, Cancún'}</Text>
                            <Text size='xs'>{'Varonil mayor'}</Text>
                        </div>
                    </div>
                    <div className={styles.time}>
                        <Text size='md'>{dayjs().format('h:mm A')}</Text>
                    </div>
                    
                </div>
            </Card>
        </GridCol>
    )
}

export default NextEventHeader