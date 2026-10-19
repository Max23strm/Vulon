import { Alert, Badge, Card, Flex, Loader, Modal, Text } from '@mantine/core'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import styles from "../styles/players.module.css";
import { playersData, playersDetailResponse } from '@/interfaces/players';
import PlayerForm from './PlayerForm';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { playersDetailFetch } from '@/app/requests/players_client';
import { useRouter } from 'next/navigation';

const PlayerEditModal = ({player}:{player: playersData}) => {

    const router = useRouter()
    const [opened, { toggle, close }] = useDisclosure();
    const [isLoading, setIsLoading] = useState(true)
    const [playerData, setPlayerData] = useState<playersDetailResponse | null>( null )
    const [errorFetched, seterrorFetched] = useState(true)

    const fetchData = useCallback(async ()=>{
        if(opened){
            setIsLoading(true)
            seterrorFetched(false)
            const playerData = await playersDetailFetch(player.player_uid)

            if(!playerData.success) {
                seterrorFetched(true)
                setIsLoading(false)
                return
            }

            setPlayerData(playerData.data)
            setIsLoading(false)
        }
    },[opened])


    useEffect (()=>{
        fetchData()
    },[fetchData])

    const handleClose = ( )=> {
        router.refresh()
        close()
    }

    const t = useTranslations('Players')

    return (
        <Fragment>
            <Card shadow="sm" padding="lg" withBorder className={styles.player_card} onClick={toggle}>
                <div>
                    <Text size="lg" fw={500}>{`${player.firstName} ${player.last_name}`}</Text>
                    <div>
                        {
                            player.assigned.length
                                ? player.assigned.map((team) => (
                                    <Badge 
                                        variant="light"
                                        color="entityPrimary"
                                        key={player.player_uid + team}
                                    >
                                        {team}
                                    </Badge>
                                ))
                            : <Text size="sm" fw={300} color="grey">{t("no_teams_assigned")}</Text>
                        }
                    </div>
                </div>
                {
                    player.status === 0 ?
                        <Badge className={styles.badge} variant="transparent" color="red">{t('inactive')}</Badge> :
                        <Badge className={styles.badge} variant="transparent" color="green">{t('active')}</Badge>
                }
            </Card>
            <Modal opened={opened} onClose={close} title={t('edit_player')} size={'xl'}>
                {
                    isLoading ? 
                        <Flex justify={'center'} gap={'1rem'} my={'2rem'}>
                            <Loader/> 
                        </Flex> : 
                        errorFetched ? <Alert color='red'>{t('error_obtaining_data')}</Alert> :
                        <PlayerForm player_info={playerData as playersDetailResponse}  page='edit' player_uid={player.player_uid} handleClose = {handleClose}/>
                }
            </Modal>
        </Fragment>
    )
}

export default PlayerEditModal