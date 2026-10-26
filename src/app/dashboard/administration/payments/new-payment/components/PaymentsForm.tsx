'use client'
import { Button, Fieldset, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dollar } from '@mynaui/icons-react'
import styles from '../../styles/components.module.css'
import { playersData } from '@/interfaces/players'
import { paymentTypesResponse } from '@/interfaces/payments'
import { PaymentsTypesPageProps, PlayersPageProps } from '@/interfaces/fetchers'
import Link from 'next/link'
import { useForm } from '@mantine/form'
import dayjs from '@/helpers/dayjs'
import { postPaymentForm } from '@/helpers/dataPoster'
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation'
import { DatesProvider } from '@mantine/dates';

type optionsForm = {
    playersResponse: PlayersPageProps,
    paymentsResponse: PaymentsTypesPageProps
}


const PaymentsForm = ({formOptions} : {formOptions: optionsForm}) => {

    const {paymentsResponse, playersResponse} = formOptions
    const router =  useRouter()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { player_uid: '', amount: 0, reference: '', date: dayjs().toDate(), payment_type_uid:'', comment:'' },
        validateInputOnBlur: true,
        // functions will be used to validate values at corresponding key
        validate: {
            player_uid: (value) => value.length < 2 ? 'Elija un jugador' : null,
            amount: (value) => value <= 0 ? 'El monto debe ser mayor a 0' : null,
            payment_type_uid: (value) => (value.length < 2 ? 'Elija un metodo de pago' : null),
            comment: (value) => (value.length > 200 ? 'El comentario es muy largo' : null),
        },
        transformValues: (values) => ({
            ...values,
            date: dayjs(values.date).toDate(),
        }),
    });
    type FormValues = typeof form.values;

    const handleSubmit = async ( formValue : FormValues ) => {
        notifications.show({
          title: 'Creando registro de pago',
          message: 'Espere un segundo por favor',
        })

        const response = await postPaymentForm(formValue)

        if(response.isSuccess) {
            notifications.show({
                title: 'Éxito',
                message:'Registro realizado con éxito',
                color: 'green'
            })
            router.push('/dashboard/administration/payments/')
        } else {
            notifications.show({
                title: 'Error',
                message:'Ocurrió un error, intente nuevamente o contate a un administrador',
                color: 'red'
            })
        }

    }
    


    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
            <Fieldset className={styles.fieldSet}>
                <Select
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    searchable
                    label="Jugador"
                    data={playersResponse.players?.map((v : playersData ) => ({value: v.player_uid, label:`${v.last_name}, ${v.firstName}` }))}
                    placeholder="Selecciona un jugador"
                    key={form.key('player_uid')}
                    {...form.getInputProps('player_uid')}
                />

                <NumberInput
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    decimalScale={2}
                    thousandSeparator=","
                    label="Monto"
                    leftSection={<Dollar/>}
                    placeholder="Monto"
                    key={form.key('amount')}
                    {...form.getInputProps('amount')}
                />
                <TextInput
                    className={styles.fullWidthElement}
                    radius={'md'}
                    label="Referencia"
                    placeholder="Inserta referencia de depósito / pago"
                    key={form.key('reference')}
                    {...form.getInputProps('reference')}
                />
            </Fieldset>
            <Fieldset className={styles.fieldSet}>
                <DatesProvider settings={{locale:'es-mx'}}>
                    <DatePickerInput
                        radius={'md'}
                        withAsterisk
                        label="Fecha de ingreso"
                        placeholder="Selecciones la fecha de ingreso"
                        className={styles.fullWidthElement}
                        key={form.key('date')}
                        {...form.getInputProps('date')}
                    />
                </DatesProvider>

                <Select
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    searchable
                    data={paymentsResponse.paymentTypes?.map( (v : paymentTypesResponse) => ({value: v.payment_type_uid, label:v.payment_name}))}
                    label="Tipo de pago"
                    placeholder="Selecciona el tipo de pago"
                    key={form.key('payment_type_uid')}
                    {...form.getInputProps('payment_type_uid')}
                >

                </Select>
            </Fieldset>

            <Textarea
                className={styles.fullWidthElement}
                radius={'md'}
                label='Comentario'
                placeholder='Ingresa algun comentario'
                key={form.key('comment')}
                {...form.getInputProps('comment')}
            />

            <Group justify='space-between' className={styles.fullWidthElement}>
                <Button 
                    component={Link}
                    href={'/dashboard/administration/payments'}
                    variant='subtle'
                >
                    Regresar
                </Button>
                <Button 
                    type='submit'
                    disabled={!form.isValid() || form.submitting}
                    loading={form.submitting}
                    variant='gradient'
                >
                    Enviar
                </Button>
            </Group>
            
        </form>
    )
}

export default PaymentsForm