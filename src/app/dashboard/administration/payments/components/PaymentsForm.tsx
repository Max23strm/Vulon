'use client'
import { Button, Fieldset, Grid, GridCol, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dollar } from '@mynaui/icons-react'
import styles from '../styles/components.module.css'
import { PaymentCat, paymentTypesResponse } from '@/interfaces/payments'
import { useForm } from '@mantine/form'
import dayjs from '@/helpers/dayjs'
import { postPaymentForm } from '@/helpers/dataPoster'
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation'
import { DatesProvider } from '@mantine/dates';
import { PayOptionsForm } from './PaymentModal'
import { playersData } from '@/interfaces/players'
import { useTranslations } from 'next-intl'
import { postPaymentForm_client } from '@/app/requests/payments_client'


const PaymentsForm = ({formOptions, close} : {formOptions: PayOptionsForm, close :()=>void}) => {
    const t = useTranslations("Payments")
    const router = useRouter()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { player_uid: '', amount: 0, reference: '', date: dayjs().toDate(), payment_type_uid:'', comment:'' },
        validateInputOnBlur: true,
        validate: {
            player_uid: (value) => value.length < 2 ? t('choose_a_player') : null,
            amount: (value) => value <= 0 ? t('amount_more_than_0') : null,
            payment_type_uid: (value) => (value.length < 2 ? t('choose_payment_method') : null),
            comment: (value) => (value.length > 200 ? t('comment_shorter') : null),
        },
        transformValues: (values) => ({
            ...values,
            date: dayjs(values.date).toDate(),
        }),
    });
    type FormValues = typeof form.values;

    const handleSubmit = async ( formValue : FormValues ) => {
        notifications.show({
          title: t('creating_payment_registration'),
          message: t('hold'),
        })

        const response = await postPaymentForm_client(formValue)
        if(response.success) {
            notifications.show({
                title: t('success'),
                message:t('successfuly_stored'),
                color: 'green'
            })
            close()
            router.refresh()
        } else {
            notifications.show({
                title: t('error'),
                message:t('try_again'),
                color: 'red'
            })
        }

    }
    
    const handleCategoryChange = ( cat : string | null ) => {
        if(!cat) {
            form.setValues({
                amount: 0,
                payment_type_uid: ''
            })
        } else {
            const categ = formOptions.paymentCat.find(c => c.payment_cat_uid === cat)
            form.setValues({
                amount: categ?.amount,
                payment_type_uid: categ?.payment_type_uid
            })
        }
    }
    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid justify='flex-end'>
                <GridCol span={{xs:12}} className={styles.fieldSet}>
                    <Select
                        className={styles.fullWidthElement}
                        radius={'md'}
                        onChange={handleCategoryChange}
                        searchable
                        label={t('categories')}
                        data={formOptions.paymentCat?.map((v : PaymentCat ) => ({value: v.payment_cat_uid, label:`${v.name}` }))}
                        placeholder={t('categories')}
                    />
                </GridCol>
                <GridCol span={{xs:12, md:4}} className={styles.fieldSet}>
                    <Select
                        className={styles.fullWidthElement}
                        radius={'md'}
                        withAsterisk
                        searchable
                        label={t('player')}
                        data={formOptions.playersData?.map((v : playersData ) => ({value: v.player_uid, label:`${v.firstName} ${v.last_name}` }))}
                        placeholder={t('player')}
                        key={form.key('player_uid')}
                        {...form.getInputProps('player_uid')}
                    />
                </GridCol>
                <GridCol span={{xs:12, sm:6, md:4}} className={styles.fieldSet}>

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
                <GridCol span={{xs:12, sm:6, md:4}} className={styles.fieldSet}>

                    <TextInput
                        className={styles.fullWidthElement}
                        radius={'md'}
                        label={t('reference')}
                        placeholder={t('inset_reference')}
                        key={form.key('reference')}
                        {...form.getInputProps('reference')}
                    />
                </GridCol>
                <GridCol span={{xs:12, sm:6}} className={styles.fieldSet}>
                    <DatesProvider settings={{locale:'es-mx'}}>
                        <DatePickerInput
                            radius={'md'}
                            withAsterisk
                            label={t('income_date')}
                            placeholder={t('select_income_date')}
                            className={styles.fullWidthElement}
                            key={form.key('date')}
                            {...form.getInputProps('date')}
                        />
                    </DatesProvider>
                    </GridCol>

                    <GridCol span={{xs:12, sm:6}} className={styles.fieldSet}>
                        <Select
                            className={styles.fullWidthElement}
                            radius={'md'}
                            withAsterisk
                            searchable
                            data={formOptions.payments?.map( (v : paymentTypesResponse) => ({value: v.payment_type_uid, label:v.payment_name}))}
                            label={t('payment_type')}
                            placeholder={t('select_payment_type')}
                            key={form.key('payment_type_uid')}
                            {...form.getInputProps('payment_type_uid')}
                        >

                        </Select>
                </GridCol>

                <GridCol span={{xs:12}} className={styles.fieldSet}>
                    <Textarea
                        className={styles.fullWidthElement}
                        radius={'md'}
                        label={t('comment')}
                        placeholder={t('insert_comment')}
                        key={form.key('comment')}
                        {...form.getInputProps('comment')}
                    />
                </GridCol>

                <GridCol span={{xs:'content'}}>
                    <Button 
                        type="submit"
                        disabled={!form.isValid() || form.submitting}
                        loading={form.submitting}
                        variant='gradient'
                    >
                        {t('save')}
                    </Button>

                </GridCol>

                
            </Grid>
         </form>
    )
}

export default PaymentsForm
