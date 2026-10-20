import { Card, Divider, Text } from '@mantine/core'
import styles from '../styles/payments.module.css'
import { useFormatter, useTranslations } from 'next-intl'
import { DatesProvider, MonthPickerInput } from '@mantine/dates'
import { useAppState } from '@/app/providers/StateProvider'
const DataHeader = ({dateValue, handleDateChange}:{dateValue: string, handleDateChange: (value: string | null) => void}) => {
    const format = useFormatter();
    const currency_code = useAppState((state) => state.entity.currency_code);

    const t = useTranslations('Payments')
    if(!currency_code) return
    return (
        <Card className={styles.mainDataStyles} shadow='sm' >
            <div className={styles.dataDisplayed}>
                <div>
                    <Text size='sm'>{t('total_this_month')}</Text>
                    <Text size='xl'>{format.number(21, {style:'currency', currency:currency_code})}</Text>
                </div>
                <Divider orientation='vertical' className={styles.divider}/>
                <div>
                    <Text size='sm'>{t('movements')}</Text>
                    <Text size='xl'>21</Text>
                </div>
                <Divider orientation='vertical' className={styles.divider}/>
                <div>
                    <Text size='sm'>{t('payments_average')}</Text>
                    <Text size='xl'>{format.number(21, {style:'currency', currency:currency_code})}</Text>
                </div>
            </div>

            {/* <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
                <MonthPickerInput
                    variant='filled'
                    value={dateValue}
                    onChange={handleDateChange}
                />
            </DatesProvider> */}
        </Card>
    )
}

export default DataHeader