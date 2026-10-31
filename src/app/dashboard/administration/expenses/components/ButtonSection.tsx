import DownloadModal from '@/app/components/adminComponents/DownloadModal'
import { ActionIcon, Button, GridCol, Group, Modal } from '@mantine/core'
import { DatesProvider, MonthPickerInput } from '@mantine/dates'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Download, FilePlus } from '@mynaui/icons-react'
import { useTranslations } from 'next-intl'
import ExpensesForm from './ExpensesForm'

const ButtonSection = ({
    isModalOpen,
    handleModal,
    value,
    handleDateChange,
}:{
    isModalOpen:boolean,
    handleModal: ()=>void,
    value: string,
    handleDateChange : (v: string | null)=>void,
}) => {
    const matches = useMediaQuery("(min-width: 900px)");
    const t = useTranslations("Payments")
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <GridCol span={{sm:12}}>
            <Group justify='space-between' align='end'>
                <DownloadModal isOpened={isModalOpen} handleModal={handleModal} type='gasto'/>
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
                    <Button
                        size='sm'
                        leftSection={<FilePlus/>}
                        onClick={toggle}
                    >
                        {t('new')}
                    </Button>
                    <Modal opened={opened} onClose={close} title={t('new_expense')}>
                        <ExpensesForm opened={opened}/>
                    </Modal>
                </Group>
            </Group>
        </GridCol>
    )
}

export default ButtonSection