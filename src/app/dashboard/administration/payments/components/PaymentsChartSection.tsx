import { Alert, Card, Skeleton } from '@mantine/core'
import React from 'react'
import styles from '../styles/payments.module.css'
import { DonutChart, LineChart } from '@mantine/charts';
import { useAppState } from '@/app/providers/StateProvider';
import { useFormatter, useTranslations } from 'next-intl';
import { PaymentsMonthStats } from '@/interfaces/payments';

type CircleItem = { name: string; value: number; color?: string };

const PALETTE = [
  'blue', 'teal', 'grape', 'orange', 'cyan', 'pink',
  'lime', 'indigo', 'red', 'yellow', 'violet', 'green',
];

const PaymentsChartSection = ({fetchedStats}:{fetchedStats: PaymentsMonthStats[]}) => {
    const format = useFormatter();
    const currency_code = useAppState((state) => state.entity.currency_code);
    const t = useTranslations('Payments')

    if(!currency_code) return


    const sortedData: CircleItem[] = fetchedStats.reduce((circ, day) => {
        const dayKeys = Object.keys(day)
        
        dayKeys.forEach(k => {
            if(k !== 'date') {
                if(!circ.some( item => item.name === k)) {
                    circ.push({ name: k, value: day[k] })
                } else {
                    const i = circ.findIndex( e => e.name === k)
                    circ[i].value += day[k]
                }
            }
        })

        return circ
    },[] as CircleItem[]).sort((a, b)=>b.value - a.value).map((item, index ) => {
        return{
            ...item,
            color : `${PALETTE[index % PALETTE.length]}.6`
        }
    })

    const circleData = [
        { name: sortedData?.[0]?.name, value: sortedData?.[0]?.value, color: sortedData[0]?.color ?? 'entityPrimary.7' },
        { name: sortedData?.[1]?.name, value: sortedData?.[1]?.value, color: sortedData[1]?.color ?? 'entitySecondary.7' },
        { name: t('other'), value: sortedData.reduce((tot, item, index) =>   tot +( index > 1 ? item?.value : 0),0), color: 'entityTertiary.7' },
    ]
    
    const lineChartSeries = sortedData.map((item ) => ({ label:item.name, name: item.name, color: item.color }))

    return (
        <div className={styles.chartsConitainer}>
            <Card shadow='sm'>
                <LineChart
                    data={fetchedStats}
                    curveType="monotone"
                    tickLine="x"
                    gridAxis="none"
                    withYAxis={false}
                    withDots={false}
                    withLegend
                    valueFormatter={(value) => format.number(value, {style:'currency', currency:currency_code})}
                    legendProps={{ verticalAlign: 'bottom'}}
                    h={300}
                    dataKey="date"
                    series={lineChartSeries}
                />
            </Card>
            <Card shadow='sm' className={styles.cicleCard}>
                <DonutChart data={circleData} withLegend
                valueFormatter={(value) => format.number(value, {style:'currency', currency:currency_code})}
                />
            </Card>
        </div>
    )
}

export default PaymentsChartSection