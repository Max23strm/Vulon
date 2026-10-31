import { Card, Divider, Skeleton, Text } from '@mantine/core'
import styles from '../styles/payments.module.css'
import { useFormatter, useTranslations } from 'next-intl'
import { useAppState } from '@/app/providers/StateProvider'
import { paymentsResponse } from '@/interfaces/payments'
const DataHeader = ({fetchedPayments, loading}:{fetchedPayments:paymentsResponse[] ,loading: boolean}) => {
    const format = useFormatter();
    const currency_code = useAppState((state) => state.entity.currency_code);

    const t = useTranslations('Payments')
    if(!currency_code) return

    const statsData = fetchedPayments.reduce((totals, elem) => {

        totals.total += elem?.amount ?? 0
        totals.movements += 1

        totals.average =totals.total /totals.movements
        return totals
    },{total:0, movements:0, average: 0})

    if(loading) {
        return <Skeleton height={85.3}/>
    }

    return (
        <Card className={styles.mainDataStyles} shadow='sm' >
            <div className={styles.dataDisplayed}>
                <div>
                    <Text size='sm'>{t('total_this_month')}</Text>
                    <Text size='xl'>{format.number(statsData.total, {style:'currency', currency:currency_code})}</Text>
                </div>
                <Divider orientation='vertical' className={styles.divider}/>
                <div>
                    <Text size='sm'>{t('movements')}</Text>
                    <Text size='xl'>{statsData.movements}</Text>
                </div>
                <Divider orientation='vertical' className={styles.divider}/>
                <div>
                    <Text size='sm'>{t('payments_average')}</Text>
                    <Text size='xl'>{format.number(statsData.average, {style:'currency', currency:currency_code})}</Text>
                </div>
            </div>
        </Card>
    )
}

export default DataHeader