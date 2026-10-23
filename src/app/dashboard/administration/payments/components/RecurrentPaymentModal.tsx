import { useAppState } from '@/app/providers/StateProvider'
import { Alert, Button, Loader, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DangerOctagon } from '@mynaui/icons-react'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PaymentCategory from './forms/PaymentCategory'
import { paymentTypesFetch_client } from '@/app/requests/payments_client'
import { paymentTypesResponse } from '@/interfaces/payments'

const RecurrentPaymentModal = () => {

    const t = useTranslations("Payments")
    const tAl = useTranslations("Alerts")
    const [opened, { toggle, close }] = useDisclosure();
    const [loading, setLoading] = useState(false)
    const [errorFetched, setErrorFetched] = useState(false)
    const entity_uid = useAppState((state) => state.entity.entity_uid);
    const [paymentsTypes, setPaymentsTypes] = useState<{label: string, value: string}[]>([])


    const paymentsTypesFetch = useCallback(async ()=>{
        if(opened) {
            setErrorFetched(false)
            setLoading(true)
            const payRes = await paymentTypesFetch_client(entity_uid)

            if(!payRes.success) {
                setPaymentsTypes([])
                setErrorFetched(true)
                setLoading(false)
                return
            }
            
            setPaymentsTypes(payRes?.data?.map(v => ({label: v.payment_name, value:v.payment_type_uid})) ?? [])
            setLoading(false)
        }
    },[entity_uid, opened])

    useEffect(()=>{
        paymentsTypesFetch()
    },[paymentsTypesFetch])

    return (
        <div>
            <Button
                size='compact-sm'
                variant='light'
                onClick={toggle}
                // leftSection={<FilePlus/>}
            >
                {t("new_payment_category")}
            </Button>
            <Modal opened={opened} onClose={close} title={t('new_payment_category')}>
                {
                    loading ? <Loader/> :
                        errorFetched ? <Alert variant="light" radius="lg" color="red" withCloseButton={false} icon={<DangerOctagon/>}>
                            {tAl('error_obtaining_information')}
                        </Alert>:
                        <PaymentCategory togglemodal={toggle} paymentsTypes={paymentsTypes}/>

                }
            </Modal>
        </div>
    )
}

export default RecurrentPaymentModal