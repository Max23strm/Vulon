import { useAppState } from '@/app/providers/StateProvider'
import { Alert, Button, Loader, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DangerOctagon } from '@mynaui/icons-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const RecurrentPaymentModal = () => {

    const t = useTranslations("Payments")
    const tAl = useTranslations("Alerts")
    const [opened, { toggle, close }] = useDisclosure();
    const [loading, setLoading] = useState(false)
    const [errorFetched, setErrorFetched] = useState(false)
    const entity_uid = useAppState((state) => state.entity.entity_uid);


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
            <Modal opened={opened} onClose={close} title={t('new_payment_category')} size={'xl'}>
                {
                    loading ? <Loader/> :
                        errorFetched ? <Alert variant="light" radius="lg" color="red" withCloseButton={false} icon={<DangerOctagon/>}>
                            {tAl('error_obtaining_information')}
                        </Alert>:
                        "Form"

                }
            </Modal>
        </div>
    )
}

export default RecurrentPaymentModal