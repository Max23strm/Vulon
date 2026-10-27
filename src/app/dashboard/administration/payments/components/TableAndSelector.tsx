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

const TableAndSelector = () => {
    const matches = useMediaQuery("(min-width: 900px)");

    const [value, setValue] = useState(dayjs().format('YYYY-MM-DD'))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fetchedPayments, setfetchedPayments] = useState<{response:paymentsResponse[], error: string | null}>({response:[], error:null})
    const [fetchedStats, setfetchedStats] = useState<{response:PaymentsMonthStats[], error: string | null}>({response:[], error:null})
    const [loading, setLoading] = useState(true)
    const makeCAll = useCallback( async ()=>{
        setLoading(true)
        const responses = await Promise.allSettled([
            paymentsGeneralFetch(value),
            monthlyPaymentsStats(value)
        ])

        const stats = responses[1].status === 'fulfilled' ? responses[1].value : {data: null, error: responses[1].reason, success: false}
        const table = responses[0].status === 'fulfilled' ? responses[0].value : {data: null, error: responses[0].reason, success: false}

        if(!table.success){
            setfetchedPayments({response:[], error: table.error})
        } else {
            setfetchedPayments({response:table?.data ?? [], error:null})
        }
        if(!stats.success){
            setfetchedPayments({response:[], error: stats.error})
        } else {
            setfetchedStats({response:stats?.data ?? [], error:null})
        }
        setLoading(false)
    },[value])

    useEffect(()=>{
        makeCAll()
    },[makeCAll])

    const handleDateChange = (value : string | null) => {
        if( value === null) setValue(dayjs(value).format('YYYY-MM-DD'))
        else setValue(value)
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
                        value={value}
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
            <PaymentsChartSection fetchedStats={fetchedStats} loading={loading}/>
            <Stack
                align="start"
                justify="center"
                gap="md"
            >
                <PaymentsTable payments={fetchedPayments.response} loading={loading} matches={matches}/>

            </Stack>
        </>
    )
}

export default TableAndSelector