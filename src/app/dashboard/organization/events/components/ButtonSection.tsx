import { Button, GridCol, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl'

const ButtonSection = () => {
    const t = useTranslations('Events')

    const [opened, { toggle, close }] = useDisclosure();
    
    return (
        <GridCol span={{xs:12}}>
            <Button onClick={toggle}>
                {t('new_event')}
            </Button>
            <Modal title={t('new_event')} opened={opened} onClose={close}>
                
            </Modal>
        </GridCol>
    )
}

export default ButtonSection