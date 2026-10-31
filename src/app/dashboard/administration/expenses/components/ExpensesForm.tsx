'use client'
import { Button, Fieldset, Group, Loader, NumberInput, Select, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dollar } from '@mynaui/icons-react'
import styles from '../styles/expenses.module.css'
import { userGeneral, UsersGeneralResponse } from '@/interfaces/fetchers'
import Link from 'next/link'
import { useForm } from '@mantine/form'
import dayjs from '@/helpers/dayjs'
import { postExpensesForm } from '@/helpers/dataPoster'
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation'
import { DatesProvider } from '@mantine/dates';
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { fetchUsers } from '@/app/requests/users_client'


const ExpensesForm = ({ opened } : {opened: boolean}) => {

    const router =  useRouter()
    const t = useTranslations("Payments")

    const [externalData, setExternalData] = useState<{users:userGeneral[], expense_types:any[]}>({users:[], expense_types:[]})
    const [loading, setLoading] = useState(true)

    const fetchInformation = useCallback(async ()=>{
        if(opened) {
            setLoading(true)
            const data = await Promise.allSettled([
                fetchUsers(),
            ])
            const users = data[0].status !== 'fulfilled' || !data[0].value.success ? [] : data[0].value.data as userGeneral[]
            setExternalData(prev => ({...prev, users}))
            setLoading(false)
        }
    },[opened])
    
    useEffect(()=>{
        fetchInformation()
    },[fetchInformation])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { assigned_uid: '', amount: 0, date: dayjs().toDate(), reason:'' },
        validateInputOnBlur: true,
        validateInputOnChange: true,
        // functions will be used to validate values at corresponding key
        validate: {
            assigned_uid: (value) => value.length < 2 ? 'Elija un jugador o usuario' : null,
            amount: (value) => value <= 0 ? 'El monto debe ser mayor a 0' : null,
            reason: (value) => (value.length < 2 ? 'Especifique la razon' : null),
        },
        transformValues: (values) => ({
            ...values,
            date: dayjs(values.date).toDate(),
        }),
    });
    type FormValues = typeof form.values;

    const handleSubmit = async ( formValue : FormValues ) => {
        notifications.show({
          title: 'Creando registro de gasto',
          message: 'Espere un segundo por favor',
        })
        const response = await postExpensesForm(formValue)
        if(response.isSuccess) {
            notifications.show({
                title: 'Éxito',
                message:'Registro realizado con éxito',
                color: 'green'
            })
            form.reset()
            router.refresh()
        } else {
            notifications.show({
                title: 'Error',
                message:'Ocurrió un error, intente nuevamente o contate a un administrador',
                color: 'red'
            })
        }
    }

    if(loading) return <Loader/>
    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
            <Select
                className={styles.fullWidthElement}
                radius={'md'}
                withAsterisk
                searchable
                label={t('responsible')}
                data={externalData.users?.map((v : userGeneral ) => ({value: v.user_uid, label:` ${v.first_name} ${v.last_name}` }))}
                placeholder={t("select_responsible")}
                key={form.key('assigned_uid')}
                {...form.getInputProps('assigned_uid')}
            />
            <Select
                className={styles.fullWidthElement}
                radius={'md'}
                withAsterisk
                searchable
                label={t('expense_types')}
                // data={usersResponse.data?.map((v : userGeneral ) => ({value: v.user_uid, label:`${v.last_name}, ${v.first_name}` }))}
                placeholder={t('expense_types_select')}
                key={form.key('expense_type_uid')}
                {...form.getInputProps('expense_type_uid')}
            />
            <Select
                className={styles.fullWidthElement}
                radius={'md'}
                searchable
                label={t('schedule_expense')}
                // data={usersResponse.data?.map((v : userGeneral ) => ({value: v.user_uid, label:`${v.last_name}, ${v.first_name}` }))}
                placeholder={t('select_a_schedule_expense')}
                key={form.key('expense_type_uid')}
                {...form.getInputProps('expense_type_uid')}
            />

            <NumberInput
                className={styles.fullWidthElement}
                radius={'md'}
                withAsterisk
                decimalScale={2}
                thousandSeparator=","
                label={t('amount')}
                leftSection={<Dollar/>}
                placeholder={t('amount')}
                key={form.key('amount')}
                {...form.getInputProps('amount')}
            />
            <DatesProvider settings={{locale:'es-mx'}}>
                <DatePickerInput
                    radius={'md'}
                    withAsterisk
                    label={t('expense_date')}
                    className={styles.fullWidthElement}
                    key={form.key('date')}
                    {...form.getInputProps('date')}
                />
            </DatesProvider>
            
            <Textarea
                className={styles.fullWidthElement}
                radius={'md'}
                withAsterisk
                label={t('reason')}
                placeholder={t('insert_reason')}
                key={form.key('reason')}
                {...form.getInputProps('reason')}
            />

            <Group justify='space-between' className={styles.fullWidthElement}>
                <Button 
                    variant='subtle'
                >
                    {t('cancel')}
                </Button>
                <Button 
                    type='submit'
                    disabled={!form.isValid() || form.submitting}
                    loading={form.submitting}
                    variant='gradient'
                >
                    {t('create')}
                </Button>
            </Group>
            
        </form>
    )
}

export default ExpensesForm