import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import { fetchExpenseById } from '@/app/requests/expenses_client'
import { ActionIcon, Alert, Grid, GridCol, Loader, Modal, TableTd, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FileText, FileTextSolid } from '@mynaui/icons-react'
import { useFormatter, useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '../styles/expenses.module.css'
import dayjs from 'dayjs'
import { ExpenseDetail } from '@/interfaces/expenses'
import { useAppState } from '@/app/providers/StateProvider'

const ExpensesActioncell = ({expense_uid}:{expense_uid:string}) => {
    const t = useTranslations('Payments')
    const currency_code = useAppState((state) => state.entity.currency_code);
    
        
    const format = useFormatter();
    const [opened, { toggle, close }] = useDisclosure();

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [expenseData, setPaymentData] = useState<ExpenseDetail | null >(null)

    const getPaymentData = useCallback(async()=>{
        if(opened && expense_uid.length) {
            setIsLoading(true)
            setError(false)
            const paymentRes = await fetchExpenseById(expense_uid)
            console.log(paymentRes)
            if(!paymentRes.success)  {
                setError(true)
            }

            setPaymentData(paymentRes.data)
            setIsLoading(false)
        } 
    },[opened, expense_uid])
    
    useEffect(()=>{
        getPaymentData()
    },[getPaymentData])


    return (
        <TableTd>
            <ActionIcon
                variant='subtle'
                onClick={toggle}
            >
                <FileTextSolid/>
            </ActionIcon>
            <Modal title={t('detail')} opened={opened} onClose={close}>
                {
                    error ?
                    <ErrorAlert errorMessage={'error_obtaining_details'}/> : 
                        isLoading ? 
                            <Loader mx={'auto'}/> :
                                <Grid className={styles.detailsSection}>
                                    <GridCol span={{base:12}}>
                                        <Text size='xl' fw={500}>{format.number(parseFloat(expenseData?.amount  ?? '0'), {style:'currency', currency:currency_code})}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("expense_amount")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        
                                        <Text size='md'>{expenseData?.expense_type}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("expense_type")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        <Text size='md'>{expenseData?.assigned_to}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("payed_by")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        <Text size='md'>{expenseData?.schedule_name ?? '-'}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("schedule_name")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        <Text size='md'>{dayjs(expenseData?.date).format('DD MMMM YYYY')}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("expense_date")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:12}}>
                                        <Text size='md'>{expenseData?.reason?.length ? expenseData?.reason : '-'}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("reason")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        <Text size='md'>{expenseData?.registered_by}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("payed_by")}</Text>
                                    </GridCol>
                                </Grid>
                }
            </Modal>
        </TableTd>
    )
}

export default ExpensesActioncell