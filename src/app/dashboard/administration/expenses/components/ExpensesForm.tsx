'use client'
import { Button, Divider, Fieldset, Grid, GridCol, Group, Loader, NumberInput, Select, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dollar } from '@mynaui/icons-react'
import styles from '../styles/expenses.module.css'
import { userGeneral, UsersGeneralResponse } from '@/interfaces/fetchers'
import Link from 'next/link'
import { useForm } from '@mantine/form'
import dayjs from '@/helpers/dayjs'
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation'
import { DatesProvider } from '@mantine/dates';
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { fetchUsers } from '@/app/requests/users_client'
import { fetchExpensesTypes, fetchScheduleExpenses, postExpensesForm } from '@/app/requests/expenses_client'
import { ExpenseType, ScheduleExpense } from '@/interfaces/expenses'

type dataState = {users:userGeneral[], expense_types:ExpenseType[], schedule_expenses: ScheduleExpense[]}

const ExpensesForm = ({ opened, toggle } : {opened: boolean, toggle: ()=>void}) => {

    const router =  useRouter()
    const t = useTranslations("Payments")

    const [externalData, setExternalData] = useState<dataState>({users:[], expense_types:[], schedule_expenses: []})
    const [loading, setLoading] = useState(true)

    const fetchInformation = useCallback(async ()=>{
        if(opened) {
            setLoading(true)
            const data = await Promise.allSettled([
                fetchUsers(),
                fetchExpensesTypes(),
                fetchScheduleExpenses(),
            ])
            const users = data[0].status !== 'fulfilled' || !data[0].value.success ? [] : data[0].value.data as userGeneral[]
            const expense_type = data[1].status !== 'fulfilled' || !data[1].value.success ? [] : data[1].value.data as ExpenseType[]
            const schedule_expense = data[2].status !== 'fulfilled' || !data[2].value.success ? [] : data[2].value.data as ScheduleExpense[]
            setExternalData(prev => ({...prev, users, expense_types: expense_type, schedule_expenses: schedule_expense}))
            setLoading(false)
        }
    },[opened])
    
    useEffect(()=>{
        fetchInformation()
    },[fetchInformation])

    

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { assigned_uid: '', amount: 0, date: dayjs().toDate(), reason:'', expense_type_uid: '', schedule_expense_uid: ''  },
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
        })
    });
    type FormValues = typeof form.values;
    

    form.watch('schedule_expense_uid', ({ previousValue, value, touched, dirty }) => {
        if(!value) {
            form.setValues({
                amount: 0,
                expense_type_uid: ''
            })
        } else {
            const expense = externalData.schedule_expenses.find(c => c.schedule_expense_uid === value)
            form.setValues({
                amount: expense?.amount,
                expense_type_uid: expense?.expense_type_uid
            })
        }
    });

    const handleSubmit = async ( formValue : FormValues ) => {
        notifications.show({
          title: 'Creando registro de gasto',
          message: 'Espere un segundo por favor',
        })
        const response = await postExpensesForm({...formValue, schedule_expense_uid: formValue.schedule_expense_uid === '' ? null : formValue.schedule_expense_uid})
        if(response.success) {
            notifications.show({
                title: 'Éxito',
                message:'Registro realizado con éxito',
                color: 'green'
            })
            form.reset()
            toggle()
            router.refresh()
        } else {
            console.log(response)
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
            <Grid>
                <GridCol span={{xs:12}}>
                    <Select
                        className={styles.fullWidthElement}
                        radius={'md'}
                        searchable
                        // onChange={handleScheduleChange}
                        key={form.key('schedule_expense_uid')}
                        {...form.getInputProps('schedule_expense_uid')}
                        label={t('schedule_expense')}
                        data={externalData.schedule_expenses?.map((v : ScheduleExpense ) => ({value: v.schedule_expense_uid, label:`${v.name}` }))}
                        placeholder={t('select_a_schedule_expense')}
                    />
                </GridCol>
                <GridCol span={{xs:12}}>
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
                </GridCol>

                <GridCol span={{xs:12, md:6}}>
                    <Select
                        className={styles.fullWidthElement}
                        radius={'md'}
                        withAsterisk
                        searchable
                        label={t('expense_types')}
                        data={externalData.expense_types?.map((v : ExpenseType ) => ({value: v.expense_type_uid, label:`${v.description}` }))}
                        placeholder={t('expense_types_select')}
                        key={form.key('expense_type_uid')}
                        {...form.getInputProps('expense_type_uid')}
                    />
                </GridCol>

                <GridCol span={{xs:12, md: 6}}>
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

                </GridCol>
                <GridCol span={{xs:12}}>
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
                </GridCol>
                <GridCol span={{xs:12}}>
                    <Textarea
                        className={styles.fullWidthElement}
                        radius={'md'}
                        withAsterisk
                        label={t('reason')}
                        placeholder={t('insert_reason')}
                        key={form.key('reason')}
                        {...form.getInputProps('reason')}
                    />
                </GridCol>

            </Grid>

            

            <Group justify='space-between' className={styles.fullWidthElement}>
                <Button 
                    variant='subtle'
                    onClick={toggle}
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