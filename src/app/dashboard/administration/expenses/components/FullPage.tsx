'use client'
import { ActionIcon, Button, Grid, GridCol, Group, Stack } from '@mantine/core'
import { DatesProvider, MonthPickerInput } from '@mantine/dates'
import { useCallback, useEffect, useState } from 'react'
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import Link from 'next/link'
import { FilePlus, Download } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'
import ExpensesTable from './ExpensesTable'
import { expensesGeneralFetch } from '@/helpers/dataFetcher'
import { SimpleExpense } from '@/interfaces/expenses'
import DownloadModal from '@/app/components/adminComponents/DownloadModal'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import ButtonSection from './ButtonSection'
import MainTiles from './MainTiles'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const FullPage = ({date, expList}:{date: string, expList: SimpleExpense[]}) => {
    const matches = useMediaQuery("(min-width: 900px)");
    const [isModalOpen, setIsModalOpen] = useState(false)

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
        <Grid>
            <ButtonSection
                isModalOpen={isModalOpen}
                handleModal={handleModal}
                value={date}
                handleDateChange={handleDateChange}
            
            />
            <MainTiles/>
            <GridCol span={{sm:12}}>
                <ExpensesTable expenses={expList} matches={matches}/>
            </GridCol>
        </Grid>
    )
}

export default FullPage