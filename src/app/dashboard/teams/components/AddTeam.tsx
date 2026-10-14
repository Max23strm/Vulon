'use client'

import { postCreateTeamClient } from "@/app/requests/teams_client";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { UsersGroup } from "@mynaui/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const AddTeam = ({entity_uid}:{entity_uid: string}) => {
    const router = useRouter()
    const [opened, { open, close }] = useDisclosure(false);

    const t = useTranslations('Teams');
    
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            description: '',
        },

        validate: {
            description: (value) =>  value.length < 3 ? t('team_name_longer') : null 
        },
    });

    const handleClose = () =>{
        form.reset()
        close()
    } 

    const submitFn = async (values: {description : string }) =>{
        form.setSubmitting(true)
        const res = await postCreateTeamClient(entity_uid, values.description)
        if(!res.success) {
            notifications.show({
                message: t('not_created'),
                color: 'red'
            })
            form.setSubmitting(false)
        } else {
            notifications.show({
                message: t('team_created'),
                color: 'green'
            })
            router.refresh()
            handleClose()
        }
    }

    return <>
        <Button 
            onClick={open}
            leftSection={<UsersGroup/>}
            variant="gradient"
            size="compact-md"
        >
            {t('new_team')}
        </Button>
        <Modal opened={opened} onClose={handleClose} title={t('add_new_team')} centered>
            <form onSubmit={form.onSubmit(submitFn)}>
                <TextInput
                    withAsterisk
                    label={t('team_name')}
                    placeholder={t('team_name_form_placeholder')}
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
                <Button disabled={!form.isValid()} type="submit" w={'100%'} mt={'1rem'} loading={form.submitting}>
                    {t('create')}
                </Button>
            </form>
        
        </Modal>
    </>
};

export default AddTeam;
