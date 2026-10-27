import { paymentsDetailFetch } from '@/app/requests/payments_client';
import { PaymentDetails } from '@/interfaces/payments';
import { ActionIcon, Alert, Text, Loader, Modal, Stack, Grid, GridCol, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FileTextSolid } from '@mynaui/icons-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react'
import styles from '../styles/payments.module.css'
import { useAppState } from '@/app/providers/StateProvider';
import dayjs from 'dayjs';

const PaymentDetail = ({payment_uid,}:{payment_uid: string}) => {
    const t = useTranslations('Payments')
    const currency_code = useAppState((state) => state.entity.currency_code);
    
    const format = useFormatter();
    const [opened, { toggle, close }] = useDisclosure();

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [paymentData, setPaymentData] = useState<PaymentDetails | null>(null)

    const getPaymentData = useCallback(async()=>{
        if(opened && payment_uid.length) {
            setIsLoading(true)
            setError(false)
            const paymentRes = await paymentsDetailFetch(payment_uid)
            console.log(paymentRes)
            if(!paymentRes.success)  {
                setError(true)
            }

            setPaymentData(paymentRes.data)
            setIsLoading(false)
        } 
    },[opened, payment_uid])

    useEffect(()=>{
        getPaymentData()
    },[getPaymentData])

    return (
        <>
            <ActionIcon
                onClick={toggle}
                variant='subtle'
            >
                <FileTextSolid/>
            </ActionIcon>

            <Modal opened={opened} onClose={close} centered>
                {
                    error ?
                    <Alert>Error</Alert> : 
                        isLoading ? 
                            <Loader mx={'auto'}/> :
                                <Grid className={styles.detailsSection}>
                                    <GridCol span={{base:12}}>
                                        <Text size='xl' fw={500}>{format.number(parseFloat(paymentData?.amount  ?? '0'), {style:'currency', currency:currency_code})}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("payment_amount")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        
                                        <Text size='md'>{paymentData?.payment_name}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("payment_type")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        <Text size='md'>{paymentData?.player_name}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("payment_name")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        <Text size='md'>{dayjs(paymentData?.date).format('DD MMMM YYYY')}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("payment_date")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:12}}>
                                        <Text size='md'>{paymentData?.comment?.length ? paymentData?.comment : '-'}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("comment")}</Text>
                                    </GridCol>
                                    <GridCol span={{base:6}}>
                                        <Text size='md'>{paymentData?.registered_by}</Text>
                                        <Text size='sm' c={'dimmed'}>{t("registered_by")}</Text>
                                    </GridCol>
                                </Grid>
                }
            </Modal>
        </>
    )
}

export default PaymentDetail