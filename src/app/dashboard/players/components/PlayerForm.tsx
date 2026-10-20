"use client"
import {  Button, Checkbox, Grid, GridCol, Group, Select, SelectProps, Text, Textarea, TextInput } from '@mantine/core'
import { estados, grupos_sanguineos, sexo } from '../helpers/options'
import styles from '../new-player/styles/playerDetail.module.css'
import { useForm } from '@mantine/form'
import dayjs from '@/helpers/dayjs'
import { playersDetailResponse, playerTypeForm, playerTypeFormWithStatusAsString, putPlayersOptions } from '@/interfaces/players'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import utc from 'dayjs/plugin/utc';
import { notifications } from '@mantine/notifications'
import PlayerStatusBadge from './PlayerStatusBadge'
import { useTranslations } from 'next-intl'
import { postPlayerForm, putPlayerForm } from '@/app/requests/players_client'
import { useAppState } from '@/app/providers/StateProvider'


interface FormEditInterface {
  player_info: playersDetailResponse;
  page: 'edit';
  player_uid: string;
  handleClose: ()=>void
}

interface FormNewInterface {
  player_info: playersDetailResponse;
  page: 'new';
  player_uid?: string
  handleClose: ()=>void
}

type formInterface = FormEditInterface | FormNewInterface;

const PlayerForm = ({player_info, page, player_uid, handleClose} : formInterface) => {
    const entity_uid = useAppState((state) => state.entity.entity_uid);
    dayjs.extend(utc);
    const t = useTranslations('Players')
    
    const hanleResponse = (res : any) => {
        console.log(res)
        if(res.success) {
            notifications.show({
                title: 'Éxito',
                message:t('success_registration'),
                color: 'green'
            })
            handleClose()
        } else {
            notifications.show({
                title: 'Error',
                message:t('error_registration'),
                color: 'red'
            })
        }
    }
    const handlePromise = async(data : playerTypeForm) => {

        if (page === 'new') {
            notifications.show({
                title: 'Creando registro de jugador',
                message: 'Espere un segundo por favor',
            })

            const response = await postPlayerForm({...data, status : data.status === '1' ? 1 : 0, entity_uid:entity_uid} as playerTypeFormWithStatusAsString);
            hanleResponse(response)
        } else {
            notifications.show({
                title: 'Editando registro de jugador',
                message: 'Espere un segundo por favor',
            })

            const dataToSend : Partial<putPlayersOptions> = {}
            const keys = Object.keys(form.getDirty()) as (keyof Partial<putPlayersOptions>)[];
            
            keys.forEach((key) => {
                const value : string | string[] | boolean | null = data[key as keyof playerTypeForm]
                if (key === 'status') {
                    dataToSend[key] = value === '1' ? 1 : 0;
                } else {
                    Object.assign(dataToSend, {[key] : value})
                }
            });

            const response = await putPlayerForm({...dataToSend, player_uid} as putPlayersOptions);
            hanleResponse(response)

        }
  
  }
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { 
            address: player_info.address,
            afiliation: player_info.afiliation,
            birth_dt: dayjs(player_info.birth_dt).utc(),
            blood_type: player_info.blood_type,
            comments: player_info.comments,
            credential: player_info.credential,
            curp: player_info.curp,
            email: player_info.email,
            emergency_number: player_info.emergency_number,
            enfermedad: player_info.enfermedad,
            firstName: player_info.firstName,
            insurance_name: player_info.insurance_name,
            insurance: player_info.insurance,
            status: player_info.status,
            last_name: player_info.last_name,
            phone_number: player_info.phone_number,
            position: [],
            sex: player_info.sex,
        },
        validateInputOnBlur: true,
        validateInputOnChange:true,
        // functions will be used to validate values at corresponding key
        validate: {
            firstName: (value) => value.length < 2 ? t('insert_player_name') : null,
            last_name: (value) => value.length < 1 ? t('insert_player_last_name') : null,
            phone_number: (value) => value.length < 1 ? t('insert_valid_phone_number') : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : t('insert_player_email')),
            birth_dt: (value) => (dayjs(value).isValid() ? null : t('invalid_date')),
        },
        transformValues: (values) =>({
            ...values,
            birth_dt:dayjs(values.birth_dt).isValid() ? dayjs(values.birth_dt).toISOString() : dayjs().toISOString(),
            position:values.position.length ? values.position : null
        }),
    });
    const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
        <Group flex="1" gap="xs">
            <PlayerStatusBadge status={parseInt(option.value)}/>
        </Group>
    );
    
    const status = form.getValues().status
    const sex = form.getValues().sex

    return (
        <form onSubmit={form.onSubmit(handlePromise)} className={styles.form}> 
            <Grid gap={{base: 12}} className={styles.fields}>
                <GridCol span={{ base: 12, md:12, lg:12 }}>
                    <Grid gap={{base: 12}} className={styles.fields}>
                        <GridCol span={{ base: 12 }}>
                            <Text c='entityPrimary' fw={700} size='xl' id='info-básica'>{t('basic_information')}</Text>
                        </GridCol>
                        <GridCol span={{ base: 12, md: 4 }}>
                            <TextInput
                                className={styles.full_width}
                                radius={'md'}
                                withAsterisk
                                label={t('name')}
                                placeholder={t('name')}
                                key={form.key('firstName')}
                                {...form.getInputProps('firstName')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 4 }}>
                            <TextInput
                                className={styles.full_width}
                                withAsterisk
                                radius={'md'}
                                label={t('last_name')}
                                placeholder={t('last_name')}
                                key={form.key('last_name')}
                                {...form.getInputProps('last_name')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 4 }}>
                            <TextInput
                                className={styles.full_width}
                                radius={'md'}
                                withAsterisk
                                label={t('email')}
                                placeholder={t('email')}
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12 }}>
                            <TextInput
                                className={styles.full_width}
                                radius={'md'}
                                label={t('address')}
                                placeholder={t('address')}
                                key={form.key('address')}
                                {...form.getInputProps('address')}
                                />
                        </GridCol>
                        <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
                            <TextInput
                                className={styles.full_width}
                                radius={'md'}
                                withAsterisk
                                label={t('phone_number')}
                                placeholder={t('phone_number')}
                                key={form.key('phone_number')}
                                {...form.getInputProps('phone_number')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
                            <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
                                <DatePickerInput
                                    radius={'md'}
                                    withAsterisk
                                    label={t('birth_date')}
                                    className={styles.full_width}
                                    key={form.key('birth_dt')}
                                    {...form.getInputProps('birth_dt')}
                                />
                            </DatesProvider>
                        </GridCol>
                        <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
                                <Select
                                    className={styles.full_width}
                                    radius={'md'}
                                    withAsterisk
                                    label={t('sex')}
                                    data={sexo}
                                    placeholder={t('sex')}
                                    key={form.key('sex')}
                                    {...form.getInputProps('sex')}
                                />
                            </GridCol>
                        <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
                            <Select
                                className={styles.full_width}
                                radius={'md'}
                                withAsterisk
                                label={t('state')}
                                data={estados}
                                placeholder={t('state')}
                                key={form.key('status')}
                                renderOption={renderSelectOption}
                                {...form.getInputProps('status')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12 }}>
                            <Text c='entityPrimary' fw={700} size='xl'  id='info-médica'>{t('medical_information')}</Text>
                        </GridCol>
                        <GridCol span={{ base: 12, md:6, lg: 4 }}>
                            <TextInput
                                className={styles.full_width}
                                radius={'md'}
                                label={t('sickness')}
                                placeholder={t('cronic_sickness')}
                                key={form.key('enfermedad')}
                                {...form.getInputProps('enfermedad')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md:6, lg: 4 }}>
                            <Select
                                className={styles.full_width}
                                radius={'md'}
                                label={t('blood_type')}
                                data={grupos_sanguineos}
                                placeholder={t('blood_type')}
                                key={form.key('blood_type')}
                                {...form.getInputProps('blood_type')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md:12, lg:4 }}>
                            <div className={styles.seguro_fields}>
                                <Checkbox
                                    label={t('insurance')}
                                    labelPosition="left"
                                    key={form.key('insurance')}
                                    {...form.getInputProps('insurance')}
                                />
                                <TextInput
                                    className={styles.full_width}
                                    radius={'md'}
                                    label={t('insurance_name')}
                                    placeholder={t('insurance_name')}
                                    key={form.key('insurance_name')}
                                    {...form.getInputProps('insurance_name')}
                                />
                            </div>
                        </GridCol>
                        <GridCol span={{ base: 12 }}>
                            <Text c='entityPrimary' fw={700} size='xl'  id='otra-info'>{t('other_information')}</Text>
                            
                        </GridCol >
                        <GridCol span={{ base: 12, md:6 }}>
                            <TextInput
                                className={styles.full_width}
                                radius={'md'}
                                label={t('affiliation')}
                                placeholder={t('affiliate_number')}
                                key={form.key('afiliation')}
                                {...form.getInputProps('afiliation')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md:6 }}>
                            <TextInput
                                className={styles.full_width}
                                radius={'md'}
                                label={t('id')}
                                placeholder={t('id')}
                                key={form.key('curp')}
                                {...form.getInputProps('curp')}
                            />
                            
                            {/* <MultiSelect
                                label="Posición"
                                radius="md"
                                data={posiciones}
                                key={form.key('position')}
                                {...form.getInputProps('position')}
                            /> */}
                        </GridCol>
                        <GridCol span={{ base: 12 }}>
                            <Textarea
                                className={styles.full_width}
                                radius={'md'}
                                label={t('comment')}
                                placeholder={t('comment')}
                                key={form.key('comment')}
                                {...form.getInputProps('comment')}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12 }}>
                        <Group  className={styles.butones}>
                            <Button 
                                onClick={handleClose}
                                variant='subtle'
                            >
                                {t('return')}
                            </Button>
                            <Button
                                disabled={ !form.isDirty() || form.submitting}
                                loading={form.submitting}
                                type='submit'
                            >
                                {
                                    page === 'edit' ?
                                        t('update') : t('create')
                                }
                            </Button>
                        </Group>
                        </GridCol>
                    </Grid>
                    </GridCol>
            </Grid>

        </form>
    )
}

export default PlayerForm