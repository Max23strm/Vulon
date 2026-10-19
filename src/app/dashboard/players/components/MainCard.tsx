'use client'
import { Card, Divider, ProgressRoot, ProgressSection, Text, useMantineTheme } from '@mantine/core'
import styles from '../styles/players.module.css'
import { UsersGroup } from "@mynaui/icons-react";
import { useTranslations } from 'next-intl';
import { playersData } from "@/interfaces/players";

const MainCard = ({players}:{players: playersData[]}) => {
    const t = useTranslations('Players')
    const theme = useMantineTheme();
    const amounts = players.reduce((am, player) => {
        am.total +=1
        if(player.status === 1) am.active += 1


        return am
    },{active:0, total: 0, male: 0, female: 0, other: 0})

    return (
        <Card className={styles.main_card} shadow='sm' >
            <div className={styles.titles}>
                <UsersGroup size={'4rem'}/>
                <div className={styles.texts}>
                    <Text size='xl' fw={500}>{`${t('player_rooster')}`}</Text>
                    <Text size='md' fw={500}>{`${amounts.total} ${t('registered_players')}`}</Text>
                    <Text size='md' fw={300}>{`${amounts.active} ${t('active')}`}</Text>
                </div>
            </div>
            <Divider orientation="vertical"/>
            <div className={styles.main_statistics}>
                <ProgressRoot size={'lg'}>
                    <ProgressSection value={20} color={theme.colors.entityPrimary[7]}/>
                    <ProgressSection value={30} color={theme.colors.entityPrimary[9]}/>
                </ProgressRoot>
                <div className={styles.main_statistics_text}>
                    <Text size={'sm'} fw={300}>{`${20} ${t('male')}`}</Text>
                    <Text size={'sm'} fw={300}>{`${30} ${t('female')}`}</Text>
                    <Text size={'sm'} fw={300}>{`${20} ${t('other')}`}</Text>
                </div>
            </div>
        </Card>
    )
}

export default MainCard