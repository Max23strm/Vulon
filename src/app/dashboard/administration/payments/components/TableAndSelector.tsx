'use client'
import { paymentsGeneralFetch } from '@/helpers/dataFetcher'
import { ActionIcon, Button, Group, Stack } from '@mantine/core'
import { DatesProvider, MonthPickerInput } from '@mantine/dates'
import { useCallback, useEffect, useState } from 'react'
import PaymentsTable from './PaymentTable'
import { paymentsResponse } from '@/interfaces/payments'
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

const TableAndSelector = () => {
    const matches = useMediaQuery("(min-width: 900px)");

    const [value, setValue] = useState(dayjs().format('YYYY-MM-DD'))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fetchedPayments, setfetchedPayments] = useState<{response:paymentsResponse[], error: string | null}>({response:[], error:null})
    const [loading, setLoading] = useState(true)
    const makeCAll = useCallback( async ()=>{
        setLoading(true)
        const { payments, errors } = await paymentsGeneralFetch(value);

        if(errors.payments){
            setfetchedPayments({response:[], error: errors.payments})
        } else {
            setfetchedPayments({response:payments ?? [], error:null})
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
                    {/* <Button
                        component={Link}
                        href={'/dashboard/administration/payments/new-payment'}
                        size='sm'
                        leftSection={<FilePlus/>}
                    >
                        Nuevo
                    </Button> */}
                    <RecurrentPaymentModal/>
                    <PaymentModal/>
                </Group>
            </Group>
            <DataHeader
                dateValue={value}
                handleDateChange={handleDateChange}
            />
            <PaymentsChartSection />
            <Stack
                bg="var(--mantine-color-body)"
                align="start"
                justify="center"
                gap="md"
            >

                <ErrorAlert errorMessage={fetchedPayments.error}/>
                <PaymentsTable payments={fetchedPayments.response} loading={loading} matches={matches}/>

            </Stack>
        </>
    )
}

export default TableAndSelector