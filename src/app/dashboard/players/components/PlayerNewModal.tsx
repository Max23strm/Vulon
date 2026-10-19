import { Modal } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'
import PlayerForm from './PlayerForm'
import { playersDetailResponse } from '@/interfaces/players'
import dayjs from 'dayjs'
import styles from '../new-player/styles/playerDetail.module.css'

const PlayerNewModal = ({isOpen, handleClose}: {isOpen: boolean, handleClose: ()=>void}) => {
    const t = useTranslations("Players")

    const playerInitialValue : playersDetailResponse = {
        address: '',
        afiliation: '',
        birth_dt: dayjs().toDate(),
        phone_number: '',
        blood_type: null,
        comments: null,
        credential: null,
        curp: null,
        email: '',
        enfermedad: null,
        firstName: '',
        last_name: '',
        player_uid: '',
        positions: null,
        sex: "Hombre",
        status:"1",
        emergency_number: '',
        insurance: false,
        insurance_name: null
    }
    
    return (
        <Modal opened={isOpen} onClose={handleClose} title={t('add_new_player')} size={'xl'}>
            <PlayerForm player_info={playerInitialValue} page='new' handleClose={handleClose}/>
        </Modal>
    )
}

export default PlayerNewModal