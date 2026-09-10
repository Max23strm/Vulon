'use client'
import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import styles from "../../styles/Authentication.module.css";
import { useForm } from "@mantine/form";
import { postLogin } from "@/helpers/loginFn";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAppState } from "@/app/providers/StateProvider";
import { getUser } from "@/helpers/dataFetcher";
import { CompleteUserData } from "@/interfaces/fetchers";

const LoginCard = () => {
    const t = useTranslations('Authentication');
    const setUser = useAppState((state) => state.setUser)
    const router = useRouter()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            user: '',
            password: '',
        },

        validate: {
            user: (value) => (value.length > 3 ? null : t('invalid_user')),
            password: (value) => (value.length < 3 ? t('invalid_length') : null ),
        },
    });
    const [isValidating, setIsValidating] = useState(false)
    type FormValues = typeof form.values;

    const handleLoing = async (values : FormValues) => {
        try{

            setIsValidating(true)
            const response = await postLogin(values)
            if(!response.success) throw new Error('Error login in')
                
            
            const expiration = new Date(response.data.expiration);
            document.cookie = `authToken=${ response.data.token };expires=${expiration.toUTCString()};path=/`

            
            const userRes = await getUser()
            if(!userRes.isSuccess) throw new Error('Error login in')
            const user = userRes.data as CompleteUserData
            setUser({
                email:user?.email,
                first_name:user?.first_name,
                last_name:user?.last_name,
                user_uid:user?.user_uid,
                username:user?.username,
            })
            notifications.show({
                message: t('loged_successfully'),
                color: 'green'
            })

            router.push("/entity-selector")
            setIsValidating(false)
            
        } catch(e ){
            notifications.show({
                title: t('error_loggin_in'),
                message: t('validate_credentials'),
                color: 'red'
            })
            setIsValidating(false)
        }

    }

    return (
        <Paper shadow="sm" radius="sm" withBorder p="md" className={styles.login_card}>
            <form className={styles.login_form} onSubmit={form.onSubmit(handleLoing)}>
                {/* <Image
                    src={pitzLogo}
                    width={250}
                    alt="Pitz logo"
                    className={styles.logo}
                /> */}

                <Title order={2} className={styles.title}>
                    {t('title')}
                </Title>

                <TextInput
                    label={t('email_address')}
                    placeholder={t('insert_email_address')}
                    size="md"
                    radius="md"
                    className={styles.input}
                    key={form.key('user')}
                    {...form.getInputProps('user')}
                />
                <PasswordInput
                    label={t('password')}
                    placeholder={t('insert_password')}
                    mt="md"
                    size="md"
                    radius="md"
                    className={styles.input}
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <div className={styles.action_buttons_section}>
                    <Button fullWidth mt="xl" size="md" radius="md"  type="submit" loading={isValidating}>
                        {t('log_in')}
                    </Button>
                    <Button component={Link} href={'/forgot-password'} fullWidth size="md" radius="md" variant="subtle">
                        {t('i_forgot_password')}
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default LoginCard;
