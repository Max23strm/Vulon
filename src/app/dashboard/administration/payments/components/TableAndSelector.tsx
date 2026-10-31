'use client'
import { ActionIcon, Button, Group, Stack } from '@mantine/core'
import { DatesProvider, MonthPickerInput } from '@mantine/dates'
import { useCallback, useEffect, useState } from 'react'
import PaymentsTable from './PaymentTable'
import { PaymentsMonthStats, paymentsResponse } from '@/interfaces/payments'
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import Link from 'next/link'
import { FilePlus, Download } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'
import DownloadModal from '@/app/components/adminComponents/DownloadModal'
import { useMediaQuery } from '@mantine/hooks'
import DataHeader from './DataHeader'
import PaymentsChartSection from './PaymentsChartSection'
import PaymentModal from './PaymentModal'
import RecurrentPaymentModal from './RecurrentPaymentModal'
import { monthlyPaymentsStats, paymentsGeneralFetch } from '@/app/requests/payments_client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const TableAndSelector = ({
    fetchedPayments,
    date,
    fetchedStats
}: {
    date:string
    fetchedPayments:paymentsResponse[],
    fetchedStats:PaymentsMonthStats[]
}) => {
    const matches = useMediaQuery("(min-width: 900px)");

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
 

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleDateChange = (value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            const date = dayjs(value).format('YYYY-MM-DD')
            params.set('date', date)
        } else {
            params.delete('date')
        }

        const query = params.toString()
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    }

    const handleModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <>  
            <DownloadModal isOpened={isModalOpen} handleModal={handleModal} type='ingreso'/>
            <Group justify='space-between' align='end'>
                <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
                    <MonthPickerInput
                        value={date}
                        onChange={handleDateChange}
                    />
                </DatesProvider>
                <Group>
                    {
                        matches ? 
                            <Button
                                size='compact-sm'
                                leftSection={<Download/>}
                                variant='light'
                                onClick={handleModal}
                            >
                                Descargar
                            </Button> :
                            <ActionIcon
                                variant='light'
                                onClick={handleModal}
                            >
                                <Download/>
                            </ActionIcon>
                    }
                    <RecurrentPaymentModal/>
                    <PaymentModal/>
                </Group>
            </Group>
            <DataHeader
                fetchedPayments={fetchedPayments}
                loading={loading}
            />
            <PaymentsChartSection fetchedStats={fetchedStats}/>
            <Stack
                align="start"
                justify="center"
                gap="md"
            >
                <PaymentsTable payments={fetchedPayments} loading={loading} matches={matches}/>

            </Stack>
        </>
    )
}

export default TableAndSelector