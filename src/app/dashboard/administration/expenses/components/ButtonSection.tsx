import DownloadModal from '@/app/components/adminComponents/DownloadModal'
import { ActionIcon, Button, GridCol, Group, Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Download, FilePlus } from '@mynaui/icons-react'
import { useTranslations } from 'next-intl'
import ExpensesForm from './ExpensesForm'

const ButtonSection = ({
    isModalOpen,
    handleModal,
}:{
    isModalOpen:boolean,
    handleModal: ()=>void,
}) => {
    const matches = useMediaQuery("(min-width: 900px)");
    const t = useTranslations("Payments")
    const [opened, { toggle, close }] = useDisclosure();

    return (
            <Group>
                {
                    matches ? 
                        <Button
                            size='sm'
                            leftSection={<Download/>}
                            variant='light'
                            onClick={handleModal}
                        >
                            {t('download')}
                        </Button> :
                        <ActionIcon
                            variant='light'
                            onClick={handleModal}
                        >
                            <Download/>
                        </ActionIcon>
                }
                <DownloadModal isOpened={isModalOpen} handleModal={handleModal} type='gasto'/>

                <Button
                    size='sm'
                    leftSection={<FilePlus/>}
                    onClick={toggle}
                >
                    {t('new')}
                </Button>
                <Modal opened={opened} onClose={close} title={t('new_expense')}>
                    <ExpensesForm opened={opened} toggle={toggle}/>
                </Modal>
            </Group>
    )
}

export default ButtonSection