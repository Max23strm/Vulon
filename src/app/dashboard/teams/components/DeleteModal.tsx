import { postDeleteTeamClient } from '@/app/requests/teams_client';
import { Button, Flex, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import  { useState } from 'react'

const DeleteModal = ({mainModalClose, team_uid}:{team_uid: string, mainModalClose: ()=>void}) => {
    const t = useTranslations("Teams");
    const router= useRouter()
    const [opened, { open, close }] = useDisclosure(false);
    const [deleting, setDeleting] = useState<boolean>(false)

    const handleDelete = async () => {
        setDeleting(true)
        const resp = await postDeleteTeamClient(team_uid)
        if(!resp.success) {
            setDeleting(false)
            notifications.show({
                message: t('error_deleting_team'),
                color:'red'
            })
            return
        }
        router.refresh()
        close()
        mainModalClose()
    }
    
    return (
        <div>
            <Button variant='subtle' color='red' onClick={open}>{t('delete_team')}</Button>
            <Modal opened={opened} onClose={close} centered>

                <Text ta="center" mb={'1.3rem'} size='lg'>
                    {t('delete_this_team')}
                </Text>
                <Flex w={'100%'} justify={'flex-end'} gap={'1rem'}>
                    <Button variant='subtle' onClick={close}>{t('cancel')}</Button>
                    <Button color='red' loading={deleting} onClick={handleDelete}>{t('delete')}</Button>
                </Flex>
            </Modal>
        </div>
    )
}

export default DeleteModal