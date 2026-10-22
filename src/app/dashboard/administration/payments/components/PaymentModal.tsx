import { Alert, Button, Loader, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DangerOctagon, FilePlus } from '@mynaui/icons-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import PaymentsForm from './PaymentsForm'
import { useAppState } from '@/app/providers/StateProvider'
import { getPlayersClient } from '@/app/requests/players_client'
import { playersData } from '@/interfaces/players'
import { paymentTypesFetch_client } from '@/app/requests/payments_client'
import { paymentTypesResponse } from '@/interfaces/payments'
type optionsForm = {playersData: playersData[], payments: paymentTypesResponse[]}

const PaymentModal = () => {
    const t = useTranslations("Payments")
    const tAl = useTranslations("Alerts")
    const [opened, { toggle, close }] = useDisclosure();
    const [loading, setLoading] = useState(false)
    const [errorFetched, setErrorFetched] = useState(false)
    const [formOptions, setFormOptions] = useState<optionsForm>({playersData:[], payments:[]})
    const entity_uid = useAppState((state) => state.entity.entity_uid);
    
    const getOptions = useCallback(async()=>{
        if(opened) {
            setErrorFetched(false)
            setLoading(true)
            const responses = await Promise.allSettled([
                getPlayersClient(entity_uid),
                paymentTypesFetch_client(entity_uid)
                
            ])
            const err = responses.find(r =>r.status === 'rejected' || !r.value.success)
            if(err) {
                console.log(err.status === 'rejected' ? err.reason : err.value.error)
                setErrorFetched(true)
                setLoading(false)
                return
            }
            setFormOptions({
                playersData: responses[0].status === 'fulfilled' ? responses[0]?.value?.data as playersData[] : [],
                payments: responses[1].status === 'fulfilled' ? responses[1]?.value?.data as paymentTypesResponse[] : []
            })
            setLoading(false)

        }
    },[opened])

    useEffect(()=>{
        getOptions()
    },[getOptions])

    return (
        <div>
            <Button
                size='compact-sm'
                onClick={toggle}
                leftSection={<FilePlus/>}
            >
                {t("new")}
            </Button>
            <Modal opened={opened} onClose={close} title={t('new_payment')} size={'xl'}>
                {
                    loading ? <Loader/> :
                        errorFetched ? <Alert variant="light" radius="lg" color="red" withCloseButton={false} icon={<DangerOctagon/>}>
                            {tAl('error_obtaining_information')}
                        </Alert> :
                        <PaymentsForm playersData={formOptions.playersData} payments={[]} close={close}/>
                }
            </Modal>
        </div>
    )
}

export default PaymentModal