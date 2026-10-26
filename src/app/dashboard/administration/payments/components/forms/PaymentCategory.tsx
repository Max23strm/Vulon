import { useAppState } from '@/app/providers/StateProvider'
import { postPaymentTypesCat_client } from '@/app/requests/payments_client'
import { paymentTypesResponse } from '@/interfaces/payments'
import { Button, Checkbox, Grid, GridCol, Input, NativeSelect, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { Dollar } from '@mynaui/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'


const PaymentCategory = ({togglemodal, paymentsTypes}:{togglemodal: ()=>void, paymentsTypes: {label: string, value: string}[]}) => {
    const t = useTranslations("Payments")
    const entity_uid = useAppState((state) => state.entity.entity_uid);
    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            description: '',
            amount: 0,
            active: true,
            paymetType: paymentsTypes[0].value,
        },

        validate: {
            amount: (value) => (value > 0 ? null : t('invalid_amount')),
            description: (value) => (value.length > 0 ? null : t('invalid_name')),
            paymetType: (value) => (typeof(value) === 'string' ? null : t('select_an_option'))
        },
    });
    type FormValues = typeof form.values;

    const handleForm = async( values: FormValues )=> {
        notifications.show({
            title: t('creating_payment_registration'),
            message: t('hold'),
        })

        const response = await postPaymentTypesCat_client({...values, entity_uid})

        if(response.success) {
            notifications.show({
                title: t('success'),
                message:t('successfuly_stored'),
                color: 'green'
            })
            togglemodal()
        } else {
            notifications.show({
                title: t('error'),
                message:t('try_again'),
                color: 'red'
            })
        }
    }

    
    return (
        <form onSubmit={form.onSubmit(handleForm)}>
            <Grid align="stretch">
                <GridCol span={12}>
                    <TextInput
                        placeholder={t('name')}
                        withAsterisk
                        {...form.getInputProps('description')}
                    />
                </GridCol>
                <GridCol span={6}>
                    <NumberInput
                        placeholder={t('amount')}
                        min={0}
                        leftSection={<Dollar/>}
                        decimalScale={2}
                        {...form.getInputProps('amount')}
                    />
                </GridCol>
                <GridCol span={6}>
                    <NativeSelect
                        data={paymentsTypes}
                        {...form.getInputProps('paymetType')}
                    />
                </GridCol>
                <GridCol >
                    <Checkbox
                        style={{marginLeft:'auto', width:'fit-content'}}
                        label={t('active')}
                        {...form.getInputProps('active')}
                        defaultChecked={form.getInputProps('active').defaultValue}
                    />
                </GridCol>
                    
                <GridCol span={12}>
                    <Button
                        type='submit'
                        fullWidth
                        disabled={!form.isValid()}
                    >
                        {t('create')}
                    </Button>
                </GridCol>
            </Grid>
        </form>
    )
}

export default PaymentCategory