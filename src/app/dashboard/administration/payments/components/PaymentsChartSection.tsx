import { Card } from '@mantine/core'
import React from 'react'
import styles from '../styles/payments.module.css'
import { DonutChart, LineChart } from '@mantine/charts';
import { chartData } from './fakeData';
import { useAppState } from '@/app/providers/StateProvider';
import { useFormatter, useTranslations } from 'next-intl';
type CircleItem = { name: 'Donations' | 'Mensuality' | 'Other'; value: number; color: string };
const PaymentsChartSection = () => {
    const format = useFormatter();
    const currency_code = useAppState((state) => state.entity.currency_code);
    const t = useTranslations('Payments')

    if(!currency_code) return

    type Category = 'Donations' | 'Mensuality' | 'Other';
    type CircleItem = { name: Category; value: number; color: string };

    const baseCategories: CircleItem[] = [
        { name: 'Donations', value: 0, color: 'entityPrimary.7' },
        { name: 'Mensuality', value: 0, color: 'entitySecondary.7' },
        { name: 'Other', value: 0, color: 'entityTertiary.7' },
    ];

    const circleData: CircleItem[] = baseCategories.map((item) => ({
    ...item,
    value: chartData.reduce((sum, d) => sum + d[item.name], 0),
    }));

    return (
        <div className={styles.chartsConitainer}>
            <Card shadow='sm'>
                <LineChart
                    data={chartData}
                    curveType="monotone"
                    tickLine="x"
                    gridAxis="none"
                    withYAxis={false}
                    withDots={false}
                    withLegend
                    withTooltip={false}
                    valueFormatter={(value) => format.number(value, {style:'currency', currency:currency_code})}
                    legendProps={{ verticalAlign: 'bottom'}}
                    h={300}
                    dataKey="date"
                    series={[
                        { label:t("donations"),name: 'Donations', color: 'entityPrimary.7' },
                        { label:t("mensuality"),name: 'Mensuality', color: 'entitySecondary.7' },
                        { label:t("other"),name: 'Other', color: 'entityTertiary.7' },
                    ]}
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