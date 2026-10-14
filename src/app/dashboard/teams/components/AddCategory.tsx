'use client'

import { postCreateTeamClient, postTeamCategoryClient } from "@/app/requests/teams_client";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Label } from "@mynaui/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const AddCategory = ({entity_uid}:{entity_uid: string}) => {
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
        const res = await postTeamCategoryClient(entity_uid, values.description)
        if(!res.success) {
            notifications.show({
                message: t('not_created'),
                color: 'red'
            })
            form.setSubmitting(false)
        } else {
            notifications.show({
                message: t('category_created'),
                color: 'green'
            })
            handleClose()
        }
    }

    return <>
        <Button 
            onClick={open}
            leftSection={<Label />}
            variant="subtle"
            size="compact-md"
        >
            {t('new_category')}
        </Button>
        <Modal opened={opened} onClose={handleClose} title={t('add_new_category')} centered>
            <form onSubmit={form.onSubmit(submitFn)}>
                <TextInput
                    withAsterisk
                    label={t('category_name')}
                    placeholder={t('category_name_form_placeholder')}
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

export default AddCategory;
